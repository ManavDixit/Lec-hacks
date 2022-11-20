const base_url='http://localhost:8000/posts/';
export const getAllPosts=async ()=>{
    const response=await fetch(base_url);
    const data=await response.json();
    return data;
}
export const createPost=async ({title,description})=>{
    try {
        const formData={title,description,token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzhiYjM5N2ViZWFhNzI2YjA2YWJkZiIsImlhdCI6MTY2ODk1NzgyM30.LztwczbSRuq0K0SZlUEaBWHcW-EsHDvEgujMZWBKgSU'}
        const data={
            method:'POST',
            body:JSON.stringify(formData),
            headers:{
                'Content-Type':'application/json',
              },
        }
        console.log(data)
        console.log(JSON.stringify(formData));
        const response=await fetch(`${base_url}addpost`,data);
        const data2=await response.json();
        return data2;
    } catch (error) {
       console.log(error);
    }
 
}