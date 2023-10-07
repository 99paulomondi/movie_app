import { Box, Button, Container, Grid, GridItem, HStack, Input, InputGroup, Tag, Text} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { StarIcon } from "@chakra-ui/icons"
import axios from "axios";
import { DetailsModal } from "./DetailsModal";

export const Movie = () => {
    const [movies, setMovie] = useState([]);
    const [query, setQuery] = useState("");
    const img_url = "https://image.tmdb.org/t/p/w500";

    // fetching the movies using an API call
    useEffect(()=> {
        axios.get("https://api.themoviedb.org/3/discover/movie?api_key=6426648808391d6941fe78d3830874bc")
        .then(res => {
            console.log(res.data.results)
            setMovie(res.data.results)
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    // implementing the search functionality
    const searchMovie = async(e) => {
        e.preventDefault();
        console.log("searching")
        try{
            const url = `https://api.themoviedb.org/3/search/movie?api_key=6426648808391d6941fe78d3830874bc&query=${query}`;
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            setMovie(data.results)
        }
        catch(e){
            console.log(e);
        }
    }

    const changeHandler = (e) => {
        setQuery(e.target.value)
    }
  return (
    <>
        <Box className="banner">
            <Container maxW={"7xl"}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} minH={"80vh"}>
                    <Box w={{base: "100%", md: "60%"}}>
                        <form onSubmit={searchMovie}>
                            <InputGroup gap={3}>
                                <Input name="query" value={query} onChange={changeHandler} aria-label="search" placeholder="Enter Movie Title ..." size={"lg"} bg={"white"}/>
                                <Button size={"lg"} type="submit" bg={"yellow.400"} color={"white"} _hover={{bg: "yellow.300"}}>Search</Button>
                            </InputGroup>
                        </form>
                    </Box>
                </Box>
            </Container>
        </Box>

        <Box marginTop={"50px"}>
            <Container maxW={"7xl"}>
                <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(5, 1fr)"}} gap={6}>
                    {
                        movies.length > 0 ? (
                            movies.map((movie)=>(
                                <>
                                    <GridItem key={movie.id}>
                                        <Box>
                                            <Box>
                                                <img src={img_url+movie.poster_path} width={"100%"} id="poster" alt={movie.title} />
                                                <Box py={2}>
                                                    <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
                                                        <Text   color={"white"} fontSize={"lg"} noOfLines={1}>{movie.title}</Text>
                                                        <HStack>
                                                            <StarIcon boxSize={4} color={"yellow"}/>
                                                            <Text color={"white"}>{movie.vote_average}</Text>
                                                        </HStack>
                                                    </Box>
                                                    
                                                </Box>

                                                <Box width={"100%"} display={"flex"} justifyContent={"space-between"} pt={2}>
                                                    <Tag variant={"solid"} colorScheme="green">Movie</Tag>
                                                    <Text color={"white"}>{movie.release_date}</Text>
                                                </Box>
                                                <Box>
                                                    <DetailsModal title={movie.title} src={img_url+movie.poster_path} description={movie.overview}/>
                                                </Box>
                                            </Box>
                                        </Box>
                                        
                                    </GridItem>
                                </>
                            ))
                        ) : (
                            <Box>
                                <Text fontSize={"2xl"} color={"white"}>No Results Found</Text>
                            </Box>
                        )
                    }
                </Grid>
            </Container>
        </Box>
    </>
  )
}