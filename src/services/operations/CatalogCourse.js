import { apiConnector } from "../apiConnector"
import { categories } from "../apiLinks"
import { toast } from "react-hot-toast";



const {
    CATEGORY_PAGE_DETAILS
} = categories;


export const getCatalogPageData = async(categoryId) => {

    const toastId = toast.loading("Loading...");
    let result = [];


     try{

        const response = await apiConnector("POST" , CATEGORY_PAGE_DETAILS , {categoryId : categoryId});

      //   console.log("Category Page Detail API : " , response);

        if(!response?.data?.success){
           console.log("Throw wali field mei error ");
           throw new Error("Could not Fetch Category page data");
        }

        result = response?.data?.data

     }catch(err){
        console.log("Category Page Detail Error : " , err);
        toast.error(err.message);
        result = err.response?.data?.data ;

     }

     toast.dismiss(toastId);
     return result;
}