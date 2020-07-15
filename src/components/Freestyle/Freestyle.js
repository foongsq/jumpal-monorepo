import React from 'react'; 
import InstagramEmbed from 'react-instagram-embed';

class Freestyle extends React.Component {
  render() {
    return (
        <div className="freestyle-container">
          <h1>Freestyle</h1>
          <InstagramEmbed
            url='https://www.instagram.com/p/CCo-S1vnV4G/?utm_source=ig_web_copy_link'
            hideCaption={true}
          />
           <InstagramEmbed
            url='https://www.instagram.com/p/CCm2-eXg6JI/?utm_source=ig_web_copy_link'
            hideCaption={true}
          />
          <InstagramEmbed
            url='https://www.instagram.com/p/CCmv2ANj672/?utm_source=ig_web_copy_link'
            hideCaption={true}
          />
          <InstagramEmbed
            url='https://www.instagram.com/p/CCphF7YAoxX/?utm_source=ig_web_copy_link'
            hideCaption={true}
          />
          <InstagramEmbed
            url='https://www.instagram.com/p/CCmdacwllR8/?utm_source=ig_web_copy_link'
            hideCaption={true}
          />
        </div>
    );
  }
}

export default Freestyle;