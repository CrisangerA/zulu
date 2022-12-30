import dynamic from "next/dynamic";

const Breadcumbs = dynamic(() => import('./Breadcumb'));
const SearchBar = dynamic(() => import('./Searchbar'));
const Typograpy = dynamic(() => import('./Typograpy'));

export { Breadcumbs, SearchBar, Typograpy };
