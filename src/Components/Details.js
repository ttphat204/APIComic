import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Menu from "./Include/Menu";

const Details = () => {
  const { slug } = useParams();
  const [getDataChapter, setDataChapter] = useState([]);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModelOpen, setisModelOpen] = useState(false);
  const item = getdata?.data?.data?.item;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`
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

  const handleClose = () => setisModelOpen(false);
  const handleReadchapter = async (chapter_api) => {
    try {
      const response = await axios.get(`${chapter_api}`);
      setDataChapter(response.data);
      setLoading(false);
      console.log(response);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setisModelOpen(true);
  };
  return (
    <>
      <Helmet>
        <title>{getdata.data.data.seoOnPage.titleHead}</title>
      </Helmet>
      <Container>
        <Menu />
        <Button as={Link} to="/">
          Trở về trang chủ
        </Button>
        <Row>
          <Col>
            {" "}
            <Card>
              <Card.Body>
                <Card.Title>{getdata.data.data.seoOnPage.titleHead}</Card.Title>
                {getdata.data.data.seoOnPage.descriptionHead}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ width: "30rem" }}>
              <Card.Img
                variant="top"
                src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`}
              />
              <Card.Body>
                <Card.Title>{item.name || "Không có tiêu đề"}</Card.Title>
                <Card.Title
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></Card.Title>
                <Card.Title>{item.updatedAt}</Card.Title>
                <Card.Title>{item.status}</Card.Title>
                {/* ========================= */}
                <Card.Text>
                  {item.author && item.author.length > 0
                    ? item.author.map((author, index) => (
                        <Badge bg="info" key={index}>
                          {author.name}
                        </Badge>
                      ))
                    : "Đang cập nhật"}
                </Card.Text>
                {/* =============================== */}
                <Card.Text>
                  {item.category && item.category.length > 0
                    ? item.category.map((category, index) => (
                        <Badge bg="info" key={index}>
                          {category.name}
                        </Badge>
                      ))
                    : "Others"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <ListGroup className="scrollable-list">
                {item.chapters && item.chapters.length > 0 ? (
                  item.chapters.map((chapter, index) => (
                    <div key={index}>
                      <h5>{chapter.server_name}</h5>
                      <ListGroup.Item>
                        {chapter.server_data &&
                        chapter.server_data.length > 0 ? (
                          chapter.server_data.map((listchapter, subIndex) => (
                            <div
                              className="chapter_click"
                              key={subIndex}
                              onClick={() =>
                                handleReadchapter(listchapter.chapter_api_data)
                              }
                            >
                              {" "}
                              Chapter : {listchapter.chapter_name}
                            </div>
                          ))
                        ) : (
                          <span>Chapter is coming soon ...</span>
                        )}
                      </ListGroup.Item>
                    </div>
                  ))
                ) : (
                  <span>Chapter is coming soon ...</span>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
        {isModelOpen && (
          <Modal show={isModelOpen} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                Chapter {getDataChapter.data.item.chapter_name} -
                {getDataChapter.data.item.comic_name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {getDataChapter.data.item.chapter_image &&
              getDataChapter.data.item.chapter_image.length > 0
                ? getDataChapter.data.item.chapter_image.map(
                    (chapterImage, index) => (
                      <Card.Img
                        style={{ margin: 0 }}
                        variant="top"
                        src={`${getDataChapter.data.domain_cdn}/${getDataChapter.data.item.chapter_path}/${chapterImage.image_file}`}
                      ></Card.Img>
                    )
                  )
                : "Không có hình ảnh ..."}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </>
  );
};

export default Details;
