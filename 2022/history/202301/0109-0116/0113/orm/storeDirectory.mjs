import { NFTStorage } from 'nft.storage'
import { filesFromPath } from 'files-from-path'
import path from 'path'

const token = 'YOUR_API_TOKEN'

async function main() {
   // you'll probably want more sophisticated argument parsing in a real app
   if (process.argv.length !== 3) {
      console.error(`usage: ${process.argv[0]} ${process.argv[1]} <directory-path>`)
   }
   const directoryPath = process.argv[2]
   const files = filesFromPath(directoryPath, {
      pathPrefix: path.resolve(directoryPath), // see the note about pathPrefix below
      hidden: true, // use the default of false if you want to ignore files that start with '.'
   })

   const storage = new NFTStorage({ token })

   console.log(`storing file(s) from ${path}`)
   const cid = await storage.storeDirectory(files)
   console.log({ cid })

   const status = await storage.status(cid)
   console.log(status)
}
main()

const cid = 'bafybeiggzq4ryi7hscq5hzvzcnk4urnxt3asp37dhgvnjilf7exskximla'

// check status based on CID
const info = await client.check(rootCid)

// display results of query
console.log(`${info.cid}`)
for (const deal of info.deals) {
   console.log(deal)
}