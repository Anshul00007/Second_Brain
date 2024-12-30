import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import TypeIt from 'typeit-react';

interface Post {
  id: number;
  title: string;
  date?: string;
  commentCount?: number;
  shareCount?: number;
}

interface Category {
  name: string;
  posts: Post[];
}

const categories: Category[] = [
  {
    name: 'Recent',
    posts: [
      {
        id: 1,
        title: "Save the links you never want to forget!",
        date: '5h ago',
        
      },
      {
        id: 2,
        title: "Be the first to know with fresh, up-to-the-minute updates!",
        date: '2h ago',
      }  
    ],
  },
  {
    name: 'Popular',
    posts: [
      {
        id: 1,
        title: "Join the conversation everyone’s talking about!",
        date: 'Jan 7',
        
      },
      {
        id: 2,
        title: "See what’s trending, because everyone’s talking about it!",
        date: 'Mar 19',
        
      },
    ],
  },
  {
    name: 'Trending',
    posts: [
      {
        id: 1,
        title: "Catch up on the newest stories as they unfold!",
        date: '2d ago',
       
      },
      {
        id: 2,
        title: "Discover what’s hot right now—don’t miss out!",
        date: '4d ago',
        
      },
    ],
  },
];

export default function Landingpage2() {
  return (
    <div className="flex h-full w-full bg-gray-500 justify-center pt-8 px-4 rounded-[22px]">
      <div className="w-full max-w-md">
        <TabGroup>
          <TabList className="flex gap-4">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className="relative rounded-full py-2 px-4 text-lg font-semibold text-black-800 transition-all duration-300 
                hover:scale-105 hover:shadow-lg hover:border-2 hover:border-gray-800 
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {name}
                <span className="absolute inset-0 border-2 border-transparent rounded-full transition-all duration-300 group-hover:border-gray-800" />
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-3">
            {categories.map(({ name, posts }) => (
              <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
                <ul>
                  {posts.map((post) => (
                    <li key={post.id} className="relative rounded-md p-3 text-lg transition hover:bg-white/5">
                      <a href="#" className="font-semibold text-black-500">
                        <span className="absolute inset-0" />
                        <TypeIt
                          options={{
                            cursor: false,
                            afterComplete: (instance:any) => {
                              instance.destroy();
                            },
                          }}
                        >
                          {post.title}
                        </TypeIt>
                      </a>
                      <ul className="flex gap-2 text-black-500/50" aria-hidden="true">
                        <li>{post.date}</li>
                        <li aria-hidden="true">&middot;</li>
                        <li> </li>
                        <li aria-hidden="true">&middot;</li>
                        <li></li>
                      </ul>
                    </li>
                  ))}
                </ul>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
