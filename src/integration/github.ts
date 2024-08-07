import axios from 'axios';
import { Keys } from '../../config/keys'


export class Github {

  async getGithub() {

    const query = `
    {
      user(login: "${Keys.githubUsername}") {
        contributionsCollection {
          commitContributionsByRepository(maxRepositories: 100) {
            repository {
              name
              owner {
                login
              }
            }
            contributions(first: 100) {
              nodes {
                commitCount
                occurredAt
              }
            }
          }
        }
      }
    }`;

    try {
        const response = await axios.post(
            'https://api.github.com/graphql',
            { query },
            {
                headers: {
                    'Authorization': `Bearer ${Keys.githubToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const repositories = response.data.data.user.contributionsCollection.commitContributionsByRepository

        const contributions = repositories.flatMap((repo: any) => {

          return repo.contributions.nodes.map((contribution: any) => ({

                repository: `${repo.repository.owner.login}/${repo.repository.name}`,
                commitCount: contribution.commitCount,
                occurredAt: contribution.occurredAt
            }));
        });

        return contributions

    } catch (error) {
        console.error('Error fetching contributions:', error)
    }
  }
}
