'use client'
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"



type CATEGORY_TYPE = {
  link: string;
  label: string;
  id: number;
}

const category:CATEGORY_TYPE[] = [
  {
    link: '/category/list?category=ALL',
    label: 'ALL',
    id: 1,
  },
  {
    link: '/category/list?category=NEW',
    label: 'NEW',
    id: 2,
  },
  {
    link: '/category/list?category=상의',
    label: '상의',
    id: 3,
  },
  {
    link: '/category/list?category=하의',
    label: '하의',
    id: 4,
  },
  {
    link: '/category/list?category=셋업',
    label: '셋업',
    id: 5,
  }
]

export function ListSideBar () {
  const params = useSearchParams()
  const currentCategory = params.get('category')

  
  return (
    <div className="w-[220px]">
      <h2 className="text-2xl font-extrabold border-b-black border-b-[4px] pb-3">남성의류</h2>

      <ul className="flex flex-col gap-3 py-5">
        {
          category.map(item => {
            return (
              <li key={item.id}>
                <Link href={item.link} className={cn('text-[16px]', currentCategory === item.label && 'font-bold')}>
                  {item.label}
                </Link>
              </li>
            )
          })
        }

      </ul>
    </div>
  )
}