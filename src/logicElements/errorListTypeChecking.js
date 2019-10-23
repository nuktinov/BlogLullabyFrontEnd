export default function errorListTypeChecking(list) {
    if(list instanceof Array) {
        let result = true;

        list.forEach(function(error) {
            if(typeof(error) !== "string") {
                result = false;
                return ;
            }
        });
        return result;
    }
    return false; 
}