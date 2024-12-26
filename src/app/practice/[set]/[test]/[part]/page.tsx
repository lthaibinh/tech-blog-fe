
import pool from "@/lib/pg";
import { QuestionItems } from "./components/QuestionItems";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export interface IAccuracy {
  id: number,
  email: string
  questionid: number,
  accuracy: number;
  partid: string
  setid: string
  testid: string
}
export async function getData({
  partid,
  setid,
  testid,
}: {
  partid: string;
  setid: string;
  testid: string;
}) {
  try {
    const query =
      "SELECT * FROM question where setid=$1 and testid=$2 and partid=$3 order by cast(questionnumber  as int) asc "; 
    const { rows } = await pool.query(query, [setid, testid, partid]);
    return rows;
  } catch (error) {
  }
}

export async function getAccuracy({
  partid,
  setid,
  testid,
  email,
}: {
  partid: string;
  setid: string;
  testid: string;
  email: string,
}) {
  try {
    const query =
      "SELECT * FROM result where setid=$1 and testid=$2 and partid=$3 and email=$4"; 
    const { rows } = await pool.query(query, [setid, testid, partid, email]);
    return rows;
  } catch (error) {
  }
}

export default async function Part({
  params,
}: {
  params: { set: string; test: string; part: string };
}) {
  const data =
    (await getData({
      partid: params.part,
      setid: params.set,
      testid: params.test,
    })) || [];

     
    // const session = await getServerSession(authOptions);

    // const accuracies: IAccuracy[] = session?.user?.email ? await getAccuracy({
    //   partid: params.part,
    //   setid: params.set,
    //   testid: params.test,
    //   email: session?.user?.email,
    // }) as IAccuracy[] : []

  return (
    <>
      
      <QuestionItems data={data} params={params}  />
      {/* {data.map((i, index) => {
        return (
          
        );
      })} */}
      {/* <PlayList
        tracks={tracks}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      /> */}
    </>
  );
}
