---
title: "Old desktop won't power on (homelab, part 0)"
pubDatetime: 2026-05-20T11:06:00+02:00
description: "The homelab plan is blocked on an old desktop that won't even power on. Part zero of debugging: RAM reseat, new CMOS battery, PSU paperclip test — and what each one actually proves."
tags:
  - homelab
  - debugging
  - hardware
draft: false
---

I'm trying to build a homelab — Proxmox host, a dev VM, Tailscale for remote access, eventually a GPU node for local model inference. The plan needs exactly one piece of hardware to be alive: an old desktop tower that's been sitting in a corner for the better part of two years. I plugged it in, hit the power button, and nothing happened. Not "no display." Not "fans spin and stop." Nothing. No LEDs, no fan twitch, no PSU click.

This is part zero of the homelab series — the part where I figure out whether I can even start.

## The symptom

Press the power button: no response from any component. No LED on the motherboard, no fan motion, no sound. The wall outlet is fine (tested with a lamp). The power cable is seated on both ends. The PSU's hard switch on the back is set to on. So either the PSU isn't delivering power, the motherboard isn't asking for it, or something between them isn't passing the request through.

## What I've tried so far

**Reseated and cleaned both RAM sticks.** Pulled both, wiped the gold contacts with a microfibre cloth, reseated firmly until both clips snapped. Bad or partially-seated RAM can prevent POST, but in my experience it doesn't usually prevent power-on entirely — the system will at least spin up and beep at you. Still: cheap to check, eliminates a class of failure. No change.

**Replaced the CMOS battery.** The original CR2032 was easily a decade old. A dead CMOS battery alone shouldn't stop a system from powering on (the BIOS just loses its settings and clock), but a corroded battery or a short across the CMOS circuit can. Popped in a new one. No change.

**Paperclip test on the PSU.** Unplug the 24-pin from the motherboard, bend a paperclip into a U, jump the green wire (PS_ON#, pin 16) to any black ground on the connector, plug the PSU back into the wall. The fan spun up. So the PSU can come out of standby and switch on its rails — at least into an unloaded state.

## What the paperclip test does and doesn't prove

This is the bit I had to remind myself of mid-debugging. The paperclip test confirms that the PSU's standby line is alive and that it'll switch on when PS_ON# is pulled low. It does **not** confirm:

- That the PSU can hold its rails under an actual load (motherboard + CPU + drives).
- That every rail on the 24-pin is delivering the right voltage when it's seated in the board.
- That the separate 4/8-pin EPS connector to the CPU is good — it's a completely separate cable.

So "PSU passes paperclip" rules out a *totally* dead PSU, but not a weak or partially-failed one. I'll come back to this if the next round of checks turns up nothing.

## Where I'm stuck and what's next

The board doesn't even *try* to start — no LEDs, no fan twitch, no PSU click when I press the button. Ranked by what I'd check next, cheapest first:

1. **Front-panel header.** Easy to mis-seat, easy to test. I'll skip the case power button entirely and short the two PWR_SW pins on the motherboard header with a screwdriver. If that powers the system, the case wiring or the button itself is the problem.
2. **EPS (CPU) power cable.** A lot of boards refuse to start with no 4/8-pin EPS connected, and the cable is easy to forget or under-seat — especially if I last opened this case half-asleep. Pull, reseat.
3. **Motherboard short.** A standoff in the wrong hole, a stray screw under the board, a swollen capacitor. I'll pull the board out of the case and "breadboard" it on a piece of cardboard with just CPU + one RAM stick + PSU + integrated graphics. If it powers on out of the case but not in it, something in the case is shorting it.
4. **Dead motherboard or CPU.** Last because they're the most expensive to be wrong about. If 1–3 don't move anything, I'll borrow a multimeter and check the rails on the 24-pin while it's seated in the board — confirm the PSU is actually delivering 12 V / 5 V / 3.3 V under load.

## To be continued

I'll update this post (or write part one) when I find out which of those it actually was. If you've hit "completely dead box, paperclip-positive PSU" before and remember what it ended up being, please tell me — I'd rather lean on someone else's misery than my own.
