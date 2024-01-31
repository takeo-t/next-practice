// import React, { useState, useEffect } from 'react';

// // 個人情報の型を定義
// interface Person {
//   id: number;
//   firstName: string;
//   lastName: string;
// }

// // 加工データの型を定義
// interface ProcessedPerson extends Person {
//   fullName: string;
// }

// const Home: React.FC = () => {
//   // ステートに型注釈を追加
//   const [originalData, setOriginalData] = useState<Person[]>([]);
//   const [processedData, setProcessedData] = useState<ProcessedPerson[]>([]);
//   const [finalData, setFinalData] = useState<string[]>([]);

//   // ① データ読み込み（本来はAPIからフェッチする）
//   useEffect(() => {
//     console.log("データ読み込み useEffect 実行");
//     const fetchData = async () => {
//       const data: Person[] = [
//         { id: 1, firstName: 'のび助', lastName: '野比' },
//         { id: 2, firstName: '玉子', lastName: '野比' },
//         { id: 3, firstName: 'のび太', lastName: '野比'},
//         { id: 4, firstName: 'ドラえもん', lastName: 'ぼく'}
//       ];
//       setOriginalData(data);
//     };

//     fetchData();
//   }, []);

//   // ② データ加工
//   useEffect(() => {
//     console.log("データ加工 useEffect 実行");
//     if (originalData.length > 0) {
//       const processed = originalData.map((d) => ({
//         ...d,
//         fullName: `${d.lastName} ${d.firstName}`,
//       }));
//       setProcessedData(processed);
//     }
//   }, [originalData]);

//   // ③ 加工データをもとにさらにデータを作る
//   useEffect(() => {
//     console.log("最終データ生成 useEffect 実行");
//     if (processedData.length > 0) {
//       const final = processedData.map(d => `契約者: ${d.fullName}`);
//       setFinalData(final);
//     }
//   }, [processedData]);

//   console.log("コンポーネント レンダリング");

//   return (
//     <div>
//       <h1>契約書データ</h1>
//       <ul>
//         {finalData.map((data, index) => (
//           <li key={index}>{data}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from 'react';

// // 個人情報の型を定義
// interface Person {
//   id: number;
//   firstName: string;
//   lastName: string;
//   fullName?: string;
// }

// // 最終データの型を定義
// type FinalData = string;

// const Home: React.FC = () => {
//   const [finalData, setFinalData] = useState<FinalData[]>([]);

//   useEffect(() => {
//     console.log("データ処理を開始します");

//     const fetchData = async () => {
//       // データ読み込み
//       const data: Person[] = [
//         { id: 1, firstName: 'のび助', lastName: '野比' },
//         { id: 2, firstName: '玉子', lastName: '野比' },
//         { id: 3, firstName: 'のび太', lastName: '野比'},
//         { id: 4, firstName: 'ドラえもん', lastName: 'ぼく'}
//       ];

//       // データ加工
//       const processedData: Person[] = data.map(d => ({
//         ...d,
//         fullName: `${d.lastName} ${d.firstName}`,
//       }));

//       // 最終データ生成
//       const final: FinalData[] = processedData.map(d => `契約者: ${d.fullName}`);
//       setFinalData(final);
//     };

//     fetchData().catch(console.error);

//     console.log("データ処理が完了しました");
//   }, []);

//   return (
//     <div>
//       <h1>契約書データ</h1>
//       <ul>
//         {finalData.map((data, index) => (
//           <li key={index}>{data}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;

import React from 'react';
import { fetchData } from '../services/dataFetcher'

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  fullName?: string;
}

type FinalData = string;

interface HomeProps {
  finalData: FinalData[];
}

const Home: React.FC<HomeProps> = ({ finalData }) => {
  return (
    <div>
      <h1>契約書データ</h1>
      <ul>
        {finalData.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const data = await fetchData();

  const processedData: Person[] = data.map(d => ({
    ...d,
    fullName: `${d.lastName} ${d.firstName}`,
  }));

  const finalData: FinalData[] = processedData.map(d => `契約者: ${d.fullName}`);

  return {
    props: {
      finalData
    }
  };
}

export default Home;
