import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Menu from "./Menu";

const Trending = () => {
  const { slug } = useParams();
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const items = getdata?.data?.data?.items;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/danh-sach/${slug}`
        );
        setData(response);
        setLoading(false);
        console.log(response);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error : {error}</p>;

  return (
    <>
      <Helmet>
        <title>{getdata.data.data.seoOnPage.titleHead}</title>
      </Helmet>
      <Container>
        <Menu />
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{getdata.data.data.seoOnPage.titleHead}</Card.Title>
                {getdata.data.data.seoOnPage.descriptionHead}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <Col>
                <Card>
                  <Card.Img
                    variant="top"
                    src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`}
                  />
                  <Card.Body>
                    <Card.Title>{item.name || "Không có tiêu đề"}</Card.Title>
                    <Card.Title>{item.updatedAt}</Card.Title>
                    <Card.Text>
                      {item.category && item.category.length > 0
                        ? item.category.map((category, index) => (
                            <Badge bg="info" key={index}>
                              {category.name}
                            </Badge>
                          ))
                        : "Others"}
                    </Card.Text>
                    <Button
                      variant="primary btn-sm"
                      as={Link}
                      to={`comics/${item.slug}`}
                    >
                      More Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Card.Body>No content Availablee</Card.Body>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Trending;
