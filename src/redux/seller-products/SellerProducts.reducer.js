import types from './SellerProducts.types';


const INITIAL_STATE = {
    seller_products : [],
    loading_products : false,
    products_error : null,

    choosen_department : null,

    demographics : null,
    loading_demographics : false,
    demographics_error : null,
    choosen_demographic : null,

    categories : null,
    loading_categories : false,
    categories_error : null,
    choosen_category : null,

    companies : null,
    loading_companies : false,
    companies_error : null,
    choosen_company : null,

    
}

const sellerProductsReducer = (state = INITIAL_STATE , action)=>{
    
    switch(action.type){
        // companies
        case types.COMPANIES_START:
            return {
                ...state,
                loading_companies : true,
                companies : null,
                companies_error : null,
            }
        case types.COMPANIES_SUCCESS:
            return {
                ...state,
                loading_companies : false,
                companies : action.payload,
                
            }
        case types.COMPANIES_ERROR:
            return {
                ...state,
                loading_companies : false,
                companies_error : action.payload,
            }
        case types.CHOOSE_COMPANY:
            return {
                ...state,
                choosen_company : action.payload,
            }


        // categories
        case types.CATEGORIES_START:
            return {
                ...state,
                loading_categories : true,
                categories : null,
                categories_error : null,
            }
        case types.CATEGORIES_SUCCESS:
            return {
                ...state,
                loading_categories : false,
                categories : action.payload,
                
            }
        case types.CATEGORIES_ERROR:
            return {
                ...state,
                loading_categories : false,
                categories_error : action.payload,
            }
        case types.CHOOSE_CATEGORY:
            return {
                ...state,
                choosen_category : action.payload,
            }

        // demographics
        case types.DEMOGRAPHICS_START:
            return {
                ...state,
                loading_demographics : true,
                demographics : null,
                demographics_error : null,
            }
        case types.DEMOGRAPHICS_SUCCESS:
            return {
                ...state,
                loading_demographics : false,
                demographics : action.payload,
                
            }
        case types.DEMOGRAPHICS_ERROR:
            return {
                ...state,
                loading_demographics : false,
                demographics_error : action.payload,
            }
        case types.CHOOSE_DEMOGRAPHIC:
            return {
                ...state,
                choosen_demographic : action.payload,
            }
        
        case types.CHOOSE_DEPARTMENT:
            
            return {
                ...state,
                choosen_department : action.payload,
            }
        case types.SELLER_PRODUCTS_START:
            return {
                ...state,
                seller_products : [],
                loading_products : true,
                products_error : null,
            }
        case types.SELLER_PRODUCTS_SUCCESS:
            return {
                ...state,
                seller_products : action.payload,
                loading_products : false,
            }
        case types.SELLER_PRODUCTS_ERROR:
            return {
                ...state,
                products_error : action.payload,
                loading_products : false,
            }

        default :
            return state;
    }
}

export default sellerProductsReducer;