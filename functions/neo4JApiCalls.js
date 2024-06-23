import Graph from "@/utils/components/neo4j/neo4jTest";
// const SERVER_URL = "https://namedropper-express-back.onrender.com";
const SERVER_URL = "https://name-dropper-express-back.vercel.app";
// const SERVER_URL = "http://localhost:3001";

export async function getGraph() {
  try {
    const res = await fetch(`${SERVER_URL}/api/Graph`, {
      // next: { : 10, tags: ["SchoolClasses"] },
      cache: "no-cache",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYxYmM0YTBkYzcwMTA3N2Y2NTAxNGYiLCJpYXQiOjE3MTA5MjcwOTB9.IZ4yEMeOqbHD3J8_XxGn6afXeU1XLyFqM8KVg5vbITE",
      },
    });
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// export async function getServerSideProps() {
//   console.log("getServerSideProps is running");
//   const res = await fetch(`${SERVER_URL}/api/Graph`);
//   console.log("Response from server:", res);
//   const data = await res.json();
//   console.log("Data fetched from server:", data);

//   return {
//     props: {
//       graphData: data,
//     },
//   };
// }

// const PageComponent = ({ graphData }) => {
//   return <Graph data={graphData} />;
// };

// export default PageComponent;

// // // pages/api/relationships.js
// // import neo4j from "neo4j-driver";

// // export default async function handler(req, res) {
// //   const driver = neo4j.driver(
// //     "neo4j+s://18a9d10d.databases.neo4j.io",
// //     neo4j.auth.basic("neo4j", "ux4Q5dATXSCn9UC6PlFtJcmN91_T0ip_eRWJ2uLxYLE")
// //   );
// //   const session = driver.session();
// //   const result = await session.run("MATCH (n)-[r]->(m) RETURN n, r, m");

// //   const nodes = new Set();
// //   const edges = [];

// //   result.records.forEach((record) => {
// //     const node1 = record.get("n").properties;
// //     const node2 = record.get("m").properties;
// //     const relationship = record.get("r").properties;

// //     nodes.add(JSON.stringify(node1));
// //     nodes.add(JSON.stringify(node2));

// //     edges.push({
// //       source: node1.id,
// //       target: node2.id,
// //       ...relationship,
// //     });
// //   });

// //   res.status(200).json({ nodes: Array.from(nodes), edges });

// //   session.close();
// //   driver.close();
// // }
