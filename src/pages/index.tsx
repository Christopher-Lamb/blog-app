import React, { useEffect, useState, useCallback } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Container, Navbar, SearchBar, SiteBanner, BlogBox, Footer, Pagination } from "../components";
import { getPageAmount, getPublishedBlogs, searchPublishedBlogs } from "../utils/blogAPI";
import { throttle } from "lodash";

interface BlogPreview {
  title: string;
  thumbnail?: string;
  description?: string;
}

interface BlogBoxProps {
  author: string;
  slug: string;
  blogPreview: BlogPreview;
  firstPublishedDate?: Date;
  lastUpdatedDate?: Date;
  // createdAt?: string | number | Date;
  // updatedAt?: string | number | Date;
}

const limit = 10;
const IndexPage: React.FC<PageProps> = () => {
  const [publishedBlogs, setPublishedBlogs] = useState<BlogBoxProps[]>([]);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [pageAmount, setPageAmount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  // Create the throttled function inside useEffect to ensure it's created only once
  const throttledSearch = useCallback(
    throttle(async (searchQuery: string, pageNumber: number, limit: number) => {
      try {
        const blogs: BlogBoxProps[] = await searchPublishedBlogs(pageNumber, searchQuery, limit);
        setPublishedBlogs(blogs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 1000),
    []
  ); // 500 ms throttle time

  const handleSearch = (searchQuery: string) => {
    console.log(searchQuery); // Optional: logging the query for debug purposes
    setCurrentSearchQuery(searchQuery);
    throttledSearch(searchQuery, pageNumber, limit);
  };

  const handleChangePage = async (pageNumber: number) => {
    setPageNumber(() => pageNumber + 1);
    let blogs: any = [];
    if (currentSearchQuery === "") {
      blogs = await getPublishedBlogs(pageNumber + 1, limit);
    } else {
      throttledSearch(currentSearchQuery, pageNumber + 1, limit);
    }
    await setPublishedBlogs(() => [...blogs]);
  };

  useEffect(() => {
    const initBlogs = async () => {
      try {
        const { totalPages }: { totalPages: number } = await getPageAmount(limit);
        setPageAmount(totalPages);
        const blogs: BlogBoxProps[] = await getPublishedBlogs(1, limit);
        const items = blogs.map((item) => item.blogPreview.title);
        await setPublishedBlogs(() => [...blogs]);
      } catch (error) {
        // throw error
      }
    };
    initBlogs();
  }, []);

  return (
    <main>
      <Navbar />
      <Container className="gap-med mt-med container mx-auto px-4 md:px-0 xl:max-w-five">
        <SiteBanner />
        <SearchBar type="large" onChange={handleSearch} />
        <Container className="gap-xsmall">
          {publishedBlogs.map((blog) => (
            <>
              <BlogBox {...blog} />
            </>
          ))}
          <Pagination pageCount={pageAmount} onChange={handleChangePage} />
        </Container>
      </Container>
      <Footer className="mt-four" />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home</title>;
