import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Pagination,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Menu from "./Menu";

const Gender = () => {
  const { slug } = useParams();
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const items = getdata?.data?.items;
  const itemsPerPage = 24;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/the-loai/${slug}?page=${currentPage}`
        );
        setData(response.data);
        setLoading(false);
        console.log(response);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error : {error}</p>;
  const totalItems = getdata?.data?.params?.pagination?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Helmet>
        <title>{getdata.data.seoOnPage.titleHead}</title>
      </Helmet>
      <Container>
        <Menu />
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{getdata.data.seoOnPage.titleHead}</Card.Title>
                {getdata.data.seoOnPage.descriptionHead}
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
        <Pagination className="pagination-container">
          <Pagination.Prev
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            const rangeStart = Math.floor((currentPage - 1) / 5) * 5 + 1;
            const rangeEnd = Math.min(rangeStart + 4, totalPages);

            if (pageNumber >= rangeStart && pageNumber <= rangeEnd) {
              return (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === currentPage}
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              );
            }
            return null;
          })}

          <Pagination.Next
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </Container>
    </>
  );
};

export default Gender;
