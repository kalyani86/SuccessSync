import { toast } from "sonner";

const { useState } = require("react")

const useFetch=(cb)=>
{
    const [data,setData]=useState(undefined);
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(null);

    const fn=async(...args)=>
    {
        setLoading(true);
        setError(null)

        try
        {
            console.log("hi here");
            console.log(...args)
            const res=await cb(...args);
            setData(res);
            setError(null);
        }
        catch(err)
        {
            setError(err);
            toast.error(err.message);
        }
        finally{
            setLoading(false)
        }
    }
    return {data,error,loading,fn,setData};
}

export default useFetch;