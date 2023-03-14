export type Repository = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  owner: {
    id: string;
    login: string;
  };
};

// Partial response as we don't need everything
export type GHSearchRepositoryResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
};
