import {Template} from 'sanity'



export const templates = (prev: Template<any, any>[]): Template<any, any>[]=>{
  
  console.log(prev);
  
  return [
    ...prev,
    // put here new templates
  ]
}