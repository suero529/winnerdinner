import React from "react";
import styled from "styled-components";
import { IoClose, IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import { useRef } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { useDebounce } from "../hooks/debounceHook";
import axios from "axios";

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 20em;
  height: 2em;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 2em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 17px;
  color: #12112e;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 17px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 17px;
  padding-right: 25px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &:hover {
    color: #dfdfdf;
  }
`;

const LineSeparator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const containerVariants = {
  expanded: {
    height: "20em",
  },
  collapsed: {
    height: "2.5em",
  },
};

const containerTransition = {
  type: "spring",
  damping: 22,
  stiffness: 150,
};

const MyJumbotron = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setIsExpanded(true);
  };

  const collapseContainer = () => {
    setIsExpanded(false);
    setSearchQuery("");
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const prepareSearchQuery = () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=a`;
    return encodeURI(url);
  };

  const searchRecipe = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;
    setLoading(true);
    const url = prepareSearchQuery(searchQuery);
    const response = await axios.get(url).catch((err) => {
      console.log("Error:", err);
    });
    if (response) {
      console.log("Response: ", response.data);
    }
  };

  useDebounce(searchQuery, 500, searchRecipe);

  return (
    <div className="jumbotron">
      <SearchBarContainer
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        transition={containerTransition}
        ref={parentRef}
      >
        <SearchInputContainer>
          <SearchIcon>
            <IoSearch />
          </SearchIcon>
          <SearchInput
            placeholder="Search for recipes"
            onFocus={expandContainer}
            ref={inputRef}
            value={searchQuery}
            onChange={changeHandler}
          />
          <AnimatePresence>
            {isExpanded && (
              <CloseIcon
                key="close-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={collapseContainer}
              >
                <IoClose />
              </CloseIcon>
            )}
          </AnimatePresence>
        </SearchInputContainer>
        {isExpanded && <LineSeparator />}
        {isExpanded && (
          <SearchContent>
            <LoadingWrapper>
              <PuffLoader loading color="lavender" size={30} />
            </LoadingWrapper>
          </SearchContent>
        )}
      </SearchBarContainer>
    </div>
  );
};

export default MyJumbotron;
