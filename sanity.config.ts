import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import categorySchema from "./sanity-schemas/category";
import productSchema from "./sanity-schemas/product";
import blogSchema from "./sanity-schemas/blog";
import { MyStudioNavbar } from "./src/components/MyStudioNavbar";
import { StudioPreview } from "./src/components/StudioPreview";

export default defineConfig({
  name: "good-products-hub",
  title: "Good Products Hub Content Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dlqibmo9",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Category List Item
            S.documentTypeListItem("category").title("Categories"),
            
            // Product List Item
            S.documentTypeListItem("product")
              .title("Products")
              .child(
                S.documentTypeList("product")
                  .title("Products")
                  .child((documentId) =>
                    S.document()
                      .documentId(documentId)
                      .schemaType("product")
                      .views([
                        S.view.form(),
                        S.view.component(StudioPreview).title("Live Preview"),
                      ])
                  )
              ),
              
            // Blog List Item
            S.documentTypeListItem("blog")
              .title("Blogs / Buying Guides")
              .child(
                S.documentTypeList("blog")
                  .title("Blogs / Buying Guides")
                  .child((documentId) =>
                    S.document()
                      .documentId(documentId)
                      .schemaType("blog")
                      .views([
                        S.view.form(),
                        S.view.component(StudioPreview).title("Live Preview"),
                      ])
                  )
              ),
          ]),
    }),
  ],
  schema: {
    types: [categorySchema, productSchema, blogSchema],
  },
  studio: {
    components: {
      navbar: MyStudioNavbar,
    },
  },
});
