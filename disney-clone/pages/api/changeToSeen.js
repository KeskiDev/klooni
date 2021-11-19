import { GraphQLClient } from "graphql-request";

export default async({body}, res) => {
    const url = process.env.ENDPOINT
    const garphcms = new GraphQLClient(url, {
        header: {"Authorization" : `Bearer ${process.env.GRAPH_CMS_TOKEN}`}
    })

    await garphcms.request(
        `
        mutation($slug: String!) {
            updateVideo(where: 
              { slug: $slug}, 
              data: { seen: true}
            ) {
              id,
              title,
              seen
            }
          }
        `,
        {slug: body.slug}
    )

    await garphcms.request(
        `mutation publishVideo($slug: String) {
            publishVideo(where: { slug: $slug}, to: PUBLISHED) {
                slug
                }
            }`,
        {slug: body.slug}
    )

    res.status(201).json({slug:body.slug})
}