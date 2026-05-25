---
title: "Breadboarding the dead desktop (homelab, part 1)"
pubDatetime: 2026-05-25T11:00:00+02:00
description: "Pulling the motherboard out of the case to test it on cardboard. Two hours of dust, a suffocated PSU, an obscure chasm full of HDDs — and a verdict."
tags:
  - homelab
  - debugging
  - hardware
draft: false
---

In [part 0](/posts/old-desktop-wont-power-on) I had a desktop that wouldn't power on, a paperclip-positive PSU, and a list of things to try. Step three on that list was "pull the board out of the case and breadboard it." I expected to spend an hour on it. I spent most of a Saturday.

This post is the second chapter of that debugging story.

## Step one: take a photo before you unplug anything

The first lesson of opening up a five-year-old prebuilt is that nothing inside it is labelled and nothing is documented. Before I touched a single connector, I took a photo of the front-panel header — the tiny PWR_SW / RESET / HDD_LED pins that are arranged differently on every board and that you will absolutely get wrong in a week's time. Same for the SATA cables and the case fans. If you ever do this, take the photo. You will thank yourself.

Then I started unplugging. Everything on the motherboard goes back to the PSU, and the PSU was going to come out anyway so I could power the board outside the case. So I might as well pull the PSU. Which meant pulling the other side panel.

## The case had been hiding more dust than I thought

The acrylic side comes off easy. The opposite panel, the one with the cable-management routing behind it, doesn't get opened often, and mine clearly hadn't been opened since the shop assembled it. Dust bunnies, plural, of the kind that make you wonder how air was moving in there at all.

The PSU was the real surprise though. A 650 W unit with non-modular cables — every rail, every Molex, every SATA power lead, all coming out of the same end like the appendages of some deep-sea thing. The shop that built this PC clearly took one look at the cable bundle, gave up, and just stuffed it into the PSU shroud. There was no room. The wires were pressed flat against the side of the case. I felt sorry for it.

Before I could lift it out I had to disconnect two HDDs that were tucked in a chasm of the case I didn't even know existed — older drives I'd forgotten were in there, which means I'd been spinning them up for years without thinking about them. Out they came, with their own coat of dust. I cleaned everything: board, heatsink, fans, PSU shroud, the drives. Wires got untangled and re-coiled. By the time I'd finished, the test hadn't even started and the afternoon was gone.

## The actual barebones test

The "breadboard" was a cardboard box that used to contain my daughter's toy guitar. Motherboard on the cardboard, CPU in the socket (already there), one RAM stick in the slot the manual says to use first. PSU on the floor next to it. 24-pin into the board, EPS into the CPU header. Nothing else — no drives, no GPU, no case wiring.

To power it on without a case button, you short the two PWR_SW pins on the front-panel header with a screwdriver. I touched them.

Nothing.

No fan twitch, no LED, no PSU click. The same dead silence as in the case.

I pulled the RAM stick — sometimes a bad stick will keep a board from POSTing, though usually you at least get fans — and tried again. Nothing.

## What that narrows it down to

At this point the suspect list is short. The PSU passes the paperclip test, which means at minimum it can come up to standby and switch on its rails. The board has been removed from the case, so it can't be shorting against a misplaced standoff. Everything non-essential has been disconnected. There are only three components left in the loop: the PSU, the motherboard, and the CPU.

I [asked Claude](https://claude.ai) to talk me through it before drawing a conclusion. The reasoning lined up with mine: a PSU that's healthy enough to pass paperclip but too weak to power even an idle board is rare, and a dead CPU usually still lets the board light an LED and spin the fans for a moment before giving up. The pattern of "no response whatsoever, even with the CPU and PSU known-okay-ish" points squarely at the motherboard.

So that's the working theory: dead board.

## Off to the repair shop

The next weekend I bagged up just the motherboard — no CPU, no RAM, no drives — and walked it into a local repair shop. Told them it doesn't power on, told them what I'd already ruled out. They said they'd get back to me by Tuesday.

I'm writing this on the Monday. Tomorrow I find out whether it's the board, whether it's repairable, or whether I'm shopping for a new platform.

## What I'll do either way

If the board is fixable for a sensible price: pay, reassemble, finally move on to actually setting up Proxmox. If it's not: this becomes the moment I stop trying to resurrect a half-decade-old prebuilt and pick a platform I actually want to live with for the next few years. I keep going back and forth on whether to use this as an excuse to build something more deliberate — a small low-power node for Proxmox plus a separate box later for the GPU work — versus just buying the cheapest used tower that'll boot.

Either way, this old desktop has already paid for itself in dust removal.
