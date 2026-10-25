import { objects } from "./objects";
import { pages } from "./pages";
import { service } from "./service";
import { settings } from "./settings";
import { faqs, processSteps, promises, serviceAreas } from "./shared";

export const sharedTypes = [promises, processSteps, faqs, serviceAreas];

export const schemaTypes = [...objects, settings, ...pages, ...sharedTypes, service];

/** One-of-a-kind documents: fixed IDs, no create/duplicate/delete in the Studio. */
export const singletonTypes = new Set([settings, ...pages, ...sharedTypes].map((t) => t.name));
