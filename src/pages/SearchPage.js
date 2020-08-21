import React from 'react';
import './SearchPage.css';
import {useStateValue} from '../StateProvider';
import useGoogleSearch from '../useGoogleSearch';
import { Link } from 'react-router-dom';
import logo from '../images/mitchoogle.svg';
import Search from '../components/Search';
import SearchIcon from '@material-ui/icons/Search';
import DescriptionIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RoomIcon from '@material-ui/icons/Room';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Testing
// import response from '../response';

function SearchPage() {
  const [{ term }] = useStateValue();
  const { data } = useGoogleSearch(term);

  // Testing
  // const data = response;
  // console.log(data);

  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img
            className="searchPage__logo"
            src={logo}
            alt="Mitchoogle"
          />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButtons/>

          <div className="searchPage__menu">
            <div className="searchPage__menuLeft">
              <div className="searchPage__menuItem">
                <SearchIcon/>
                <Link to="/all">All</Link>
              </div>
              <div className="searchPage__menuItem">
                <DescriptionIcon/>
                <Link to="/news">News</Link>
              </div>
              <div className="searchPage__menuItem">
                <ImageIcon/>
                <Link to="/images">Images</Link>
              </div>
              <div className="searchPage__menuItem">
                <LocalOfferIcon/>
                <Link to="/shopping">Shopping</Link>
              </div>
              <div className="searchPage__menuItem">
                <RoomIcon/>
                <Link to="/maps">Maps</Link>
              </div>
              <div className="searchPage__menuItem">
                <MoreVertIcon/>
                <Link to="/more">More</Link>
              </div>
            </div>
            <div className="searchPage__menuRight">
              <div className="searchPage__menuItem">
                <Link to="/settings">Settings</Link>
              </div>
              <div className="searchPage__menuItem">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {term && (
        <div className="searchPage__results">
          <p className="searchPage__resultsCount">
            About {data?.searchInformation.formattedTotalResults} results
            ({data?.searchInformation.formattedSearchTime} seconds) for {term}
          </p>
          {data?.items.map((item, index) => (
            <div key={item.cacheId + '_' + index} className="searchPage__result">
              {item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src && (
                <img
                  className="searchPage__resultImage"
                  src={item.pagemap?.cse_image[0]?.src}
                  alt=""
                />
              )}
              <div className="searchPage__resultContainer">
                <a className="searchPage__resultTopLink" href={item.link}>
                  {item.displayLink}
                </a>
                <a className="searchPage__resultTitle" href={item.link}>
                  <h2>{item.title}</h2>
                </a>
                <p className="searchPage__resultSnippet">
                  {item.snippet}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchPage;
