export const buildAdListQuery = () => `
query(
    $first:Int!,
    $offset:Int!,
    $sort:String!,
    $queryExpr:String!
) {
  guillotine {
    query(
        contentTypes: ["no.rett24.app.adinizor:testcontent"],
        query: $queryExpr,
        first: $first,
        offset: $offset,
        sort: $sort,
    ) {
      ... on no_rett24_app_adinizor_Testcontent {
        _id
        _name
        displayName
        data {
          ostost
        }
      }
    }
  }
}`;


// Returns arrays unchanged.
// If the maybeArray arg is a non-array value, wraps it in a single-item array.
// If arg is falsy, returns an empty array.
const forceArray = maybeArray => Array.isArray(maybeArray)
                                 ? maybeArray
                                 : maybeArray
                                   ? [maybeArray]
                                   : [];

// Adapts the output from the guillotine query to the MovieList props signature
export const extractMovieArray = responseData => responseData.data.guillotine.query
    .filter(movieItem => movieItem && typeof movieItem === 'object' && Object.keys(movieItem).indexOf('data') !== -1)
    .map(
        movieItem => ({
            id: movieItem._id,
            title: movieItem.displayName.trim(),
            imageUrl: movieItem.data.image.imageUrl,
            year: movieItem.data.year,
            description: movieItem.data.description,
            actors: forceArray(movieItem.data.actor)
                .map(actor => (actor || '').trim())
                .filter(actor => !!actor)
        })
    );

export default {};