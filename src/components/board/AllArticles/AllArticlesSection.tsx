/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import { useAllArticlesQuery } from '@/queries/article.queries';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Dropdown from '../../common/Dropdown';
import ArticleCardSkeleton from '../Skeleton/ArticleCardSkeleton';
import ArticleCard from './ArticleCard';

type AllArticlesSectionProps = {
  searchValue: string;
};
type OrderByType = 'recent' | 'like';

function AllArticlesSection({ searchValue }: AllArticlesSectionProps) {
  const [orderBy, setOrderBy] = useState<OrderByType>('recent');
  const PAGE_SIZE = 4;
  const { data, fetchNextPage, hasNextPage, isLoading } = useAllArticlesQuery(
    orderBy,
    searchValue,
    PAGE_SIZE
  );

  const { ref, inView } = useInView({ threshold: 0.8 });

  useEffect(() => {
    if (inView && hasNextPage) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const allArticles = data?.pages.flatMap((page) => page.list) ?? [];

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex items-center justify-between ">
        <h1 className="text-xl-bold text-white">게시물</h1>
        <div className="relative">
          <Dropdown
            trigger={
              <div
                className="absolute right-0 flex w-[8rem] cursor-pointer 
                items-center justify-center gap-[0.625rem]
              rounded-lg bg-tertiary px-[0.875rem] py-[0.625rem] mob:w-[6.5rem]"
              >
                <p>{orderBy === 'recent' ? '최신순' : '좋아요순'}</p>
                <Image
                  src="/icons/Toggle.svg"
                  width={24}
                  height={24}
                  alt="arrowDown"
                />
              </div>
            }
            dropdownStyle="w-[8rem] mob:w-[6.5rem] mt-1 z-10 absolute
             right-0 top-12"
          >
            <button
              className="h-[3rem] "
              type="button"
              onClick={() => setOrderBy('recent')}
            >
              최신순
            </button>
            <button
              className="h-[3rem]"
              type="button"
              onClick={() => setOrderBy('like')}
            >
              좋아요순
            </button>
          </Dropdown>
        </div>
      </div>
      <div className="flex flex-col gap-5 pc:grid pc:grid-cols-2">
        {isLoading
          ? [1, 2, 3, 4].map((index) => <ArticleCardSkeleton key={index} />)
          : allArticles?.map((article, index) => (
              <div
                ref={index === allArticles.length - 1 ? ref : null}
                key={article.id}
              >
                <ArticleCard article={article} />
              </div>
            ))}
      </div>
      {allArticles.length === 0 && !isLoading && (
        <div className="text-center text-lg text-white">데이터가 없습니다.</div>
      )}
    </div>
  );
}

export default AllArticlesSection;
