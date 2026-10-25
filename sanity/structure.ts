import type { StructureResolver } from "sanity/structure";

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, "settings", "Business info"),
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              singleton(S, "homePage", "Homepage"),
              singleton(S, "aboutPage", "About"),
              singleton(S, "servicesPage", "Services"),
              singleton(S, "processPage", "Process"),
              singleton(S, "serviceAreasPage", "Service areas"),
              singleton(S, "contactPage", "Contact"),
            ]),
        ),
      S.documentTypeListItem("service")
        .title("Services")
        .child(S.documentTypeList("service").title("Services").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.divider(),
      S.listItem()
        .title("Shared lists")
        .child(
          S.list()
            .title("Shared lists")
            .items([
              singleton(S, "promises", "Promises"),
              singleton(S, "processSteps", "Process steps"),
              singleton(S, "faqs", "General questions"),
              singleton(S, "serviceAreas", "Service areas"),
            ]),
        ),
    ]);
