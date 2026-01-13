//Categories
export function formatCategory(category) {
    //g is a regex flag to replace all occurrences of "_"
    return category.replace(/_/g, " ");
  }


export function searchFilter(query){
    const lowerCaseQuery = query.toLowerCase();

    return function(resource) {
            //empty query
           if (!lowerCaseQuery) {
             return true;
           }
        return ( //.includes is a substring search that looks for exact pattern match
            (resource.title?.toLowerCase() || '').includes(lowerCaseQuery) ||
            (resource.description?.toLowerCase() || '').includes(lowerCaseQuery) ||
            (resource.formatCategory?.toLowerCase() || '').includes(lowerCaseQuery) ||
            (resource.subCategory?.toLowerCase() || '').includes(lowerCaseQuery)
        );
    };
}

export function sortResources(resources, compareFunc) {
    //spread resources. Returns a copy
    return [...resources].sort(compareFunc);
}