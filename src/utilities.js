//Categories
export function formatCategory(category) {
    //g is a regex flag to replace all occurrences of "_"
    return category.replace(/_/g, " ");
  }


export function searchFilter(query){
    const lowerCaseQuery = query.toLowerCase();

    return function(resource) {
           if (!lowerCaseQuery) {
             return true;
           }

        return ( 
            resource.title.toLowerCase().includes(lowerCaseQuery) || 
            resource.description.toLowerCase().includes(lowerCaseQuery) ||
            resource.formatCategory.toLowerCase().includes(lowerCaseQuery) ||
            resource.subCategory.toLowerCase().includes(lowerCaseQuery)
        );
    };
}


// Other subjects 