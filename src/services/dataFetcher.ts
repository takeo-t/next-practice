import { Person } from "@/pages";

export async function fetchData(): Promise<Person[]> {

  const data: Person[] = [
    { id: 1, firstName: 'のび助', lastName: '野比' },
    { id: 2, firstName: '玉子', lastName: '野比' },
    { id: 3, firstName: 'のび太', lastName: '野比' },
    { id: 4, firstName: 'ドラえもん', lastName: 'ぼく' }
  ];
  return data;
}
