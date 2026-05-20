import type { CollectionEntry } from "astro:content";
import config from "@/config";

/**
 * Determines whether a post is eligible to be listed/rendered.
 *
 * - In dev, shows everything (drafts and scheduled future posts) to make authoring easier
 * - In production, excludes drafts and excludes scheduled posts until `pubDatetime` minus the configured margin
 */
export function postFilter({ data }: CollectionEntry<"posts">) {
  if (import.meta.env.DEV) return true;
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - config.posts.scheduledPostMargin;
  return !data.draft && isPublishTimePassed;
}
