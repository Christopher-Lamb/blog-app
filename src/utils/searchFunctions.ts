interface BlogPreview {
  title: string;
  thumbnail?: string;
  description?: string;
}

interface BlogBoxProps {
  author: string;
  slug: string;
  blogPreview: BlogPreview;
  isPublished?: boolean;
  firstPublishedDate?: string | number | Date;
  lastUpdatedDate?: string | number | Date;
  createdAt?: string | number | Date;
  updatedAt?: string | number | Date;
}

export function localSearchBlogs(blogs: BlogBoxProps[], searchTerm: string): BlogBoxProps[] {
  const matchingBlogs: BlogBoxProps[] = [];
  const nonMatchingBlogs: BlogBoxProps[] = [];

  // Divide blogs into matching and non-matching arrays
  blogs.forEach((blog) => {
    if (blog.blogPreview.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      matchingBlogs.push(blog);
    } else {
      nonMatchingBlogs.push(blog);
    }
  });

  // Sort only the matching blogs
  matchingBlogs.sort((a, b) => {
    const titleA = a.blogPreview.title.toLowerCase();
    const titleB = b.blogPreview.title.toLowerCase();
    if (titleA.startsWith(searchTerm.toLowerCase()) && !titleB.startsWith(searchTerm.toLowerCase())) {
      return -1;
    } else if (!titleA.startsWith(searchTerm.toLowerCase()) && titleB.startsWith(searchTerm.toLowerCase())) {
      return 1;
    }
    return titleA.indexOf(searchTerm.toLowerCase()) - titleB.indexOf(searchTerm.toLowerCase());
  });

  // Return the concatenated result of matching and non-matching blogs
  return matchingBlogs.concat(nonMatchingBlogs);
}

// // Example usage:
// const blogs: BlogBoxProps[] = [
//   { author: "Jane Doe", slug: "blog-1", blogPreview: { title: "How to code in TypeScript" } },
//   { author: "John Smith", slug: "blog-2", blogPreview: { title: "TypeScript in 10 minutes" } },
//   { author: "Alice Johnson", slug: "blog-3", blogPreview: { title: "Introduction to TypeScript" } },
// ];

// const searchTerm = "typescript";
// const sortedBlogs = searchBlogs(blogs, searchTerm);
// console.log(sortedBlogs);
