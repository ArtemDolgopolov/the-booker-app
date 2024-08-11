import { fetchResults } from "@/lib/fetchResults";
import { notFound } from "next/navigation";

type Props = {
 searchParams: SearchParams
}

export type SearchParams = {
 url: URL;
 group_adults: string;
 group_children: string;
 no_rooms: string;
 checkin: string;
 checkout: string;
}

async function SearchPage({ searchParams } : Props) { //props: Props is an allowed form of code as well
 if (!searchParams.url) notFound()

 const results = await fetchResults(searchParams)

 if (!results) return <div>No Results Found...</div>
 
 return (
   <div>SearchPages</div>
 )
}

export default SearchPage