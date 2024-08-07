import axios from 'axios'
import { Keys } from '../../config/keys'


export class Linkedin {

    async getLinkedIn() {

    try {
      const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
        headers: {
          Authorization: `Bearer ${Keys.linkedinToken}`,
        },
      });
  
      return profileResponse.data.localizedHeadline
 
    } catch (error) {
      console.error('Error in linkedin route:', error)
    }
  }
}
