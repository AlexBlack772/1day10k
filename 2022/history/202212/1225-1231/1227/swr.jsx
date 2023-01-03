const { data, error, isLoading, isValidating, mutate } = useSWR(
  key,
  fetcher,
  options
);

 export async function getStaticProps() {
   // `getStaticProps` はサーバー側で実行されます
   const article = await getArticleFromAPI();
   return {
     props: {
       fallback: {
         "/api/article": article,
       },
     },
   };
 }

 function Article() {
   // `data` は `fallback` を利用して常に利用可能です。
   const { data } = useSWR("/api/article", fetcher);
   return <h1>{data.title}</h1>;
 }

export default function Page({ fallback }) {
   // `SWRConfig` の範囲内の SWR フックは、設定の値を使用します。
   return (
     <SWRConfig value={{ fallback }}>
       <Article />
     </SWRConfig>
   );
}



