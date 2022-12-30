import { Breadcumbs, SearchBar } from "../components";
import Head from "next/head";

export default function MainLayout({title, categories, children}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <SearchBar />

      <div className='container py-3'>
        <Breadcumbs categories={categories} />
        <div className='card border-0' style={{ padding: '16px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
