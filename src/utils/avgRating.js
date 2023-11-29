export const GetavgRating = (ratingArr) => {
    if(ratingArr.length === 0){
        return 0;
    }

    const totalRatingCount = ratingArr.reduce((acc , curr) => {
       acc = acc + curr.rating ;
       return acc;
    } , 0)

    const multipiler = Math.pow(10 , 1);

    const avgRatingCount = Math.round((totalRatingCount / ratingArr.length) * multipiler) / multipiler ;

    return avgRatingCount ;

}
