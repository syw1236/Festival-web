import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import festivalsData from '../data/festivalsData';
import { FaHeart } from 'react-icons/fa';
import { IoHome } from "react-icons/io5";
import '../css/FestivalDetail.css';
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineSchedule } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { BiWon } from "react-icons/bi";
import ImageSlider from './ImageSlider';



const { kakao } = window;

const FestivalDetail = () => {
    const { id } = useParams(); // 객체 구조 분해 할당으로 id값 가져옴
    const festival = festivalsData.find((item) => item.id === parseInt(id));

    const [festivalStatus, setFestivalStatus] = useState('');

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(festival.likes);

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 상태 관리를 위한 state
    const [coords, setCoords] = useState(null); // 좌표 상태 관리를 위한 state

    useEffect(() => {
        if (!festival) {
            return;
        }

        const currentDate = new Date();
        const startDate = new Date(festival.date[0]);
        const endDate = new Date(festival.date[1]);

        let status = '';

        if (currentDate < startDate) { // 현재 날짜가 시작 날짜보다 이전이면
            status = '축제 예정';
        } else if (currentDate > endDate) { // 현재 날짜가 종료 날짜보다 이후이면
            status = '축제 종료'; 
        } else { // 그 외의 경우 (즉, 현재 날짜가 시작 날짜와 종료 날짜 사이에 있으면)
            status = '축제 진행 중';
        }

        setFestivalStatus(status);

        // 지도 표시
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };

        // Geocoder 생성
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(festival.detail_location, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                setCoords(coords); // 좌표 상태 업데이트
                options.center = coords;
                const map = new kakao.maps.Map(container, options);
        
                const marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                kakao.maps.event.addListener(marker, 'click', function() {
                    setIsModalOpen(true); 
                });
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
        

        // 모달이 열릴 때 지도를 숨기고, 모달이 닫힐 때 지도를 다시 보여주는 코드
        if (isModalOpen) {
            document.getElementById('map').style.display = 'none';
        } else {
            document.getElementById('map').style.display = 'block';
        }
        
    }, [festival, isModalOpen]);

    if (!festival) {
        return <div>Festival not found</div>;
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLike = () => {
        setLiked((prevLiked) => !prevLiked);
        setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
    };

    const openImageModal = () => {
        setIsImageModalOpen(true);
    };
    
    const closeImageModal = () => {
        setIsImageModalOpen(false);
    };
    

    return (
        <div className="yellow-section">
            <div className='content-margin'>
                <div className='center'>국내 축제</div>
                <span className='bold-text-main'><IoHome /> 축제 메인으로</span>
                <div style={{display: 'flex', marginBottom: '30px'}}>
                    <div className='inline_block'>
                        <div className='sub_title'>{festival.description}</div>
                        <div className='bold-title'>{festival.name}</div>
                        <div className='festival-status' style={{ backgroundColor: festivalStatus === '축제 진행 중' ? 'orangered' : 'grey' }}>{festivalStatus}</div>
                        <div className='bold-text'>{festival.date.join(' ~ ')}</div>
                        <div onClick={handleLike} className="like-button">
                            <FaHeart style={{ color: liked ? 'red' : 'grey' }} />
                            {likes}
                        </div>
                    </div>
                    <div className='inline_block_img'><img src={festival.poster} alt={festival.name} className="poster-image" /></div>
                </div>
                <div className="image-container">
                    <img src={festival.image1} alt="축제 이미지1" className="festival-image" onClick={openImageModal} />
                    <img src={festival.image2} alt="축제 이미지2" className="festival-image" onClick={openImageModal} /> 
                    <img src={festival.image3} alt="축제 이미지3" className="festival-image" onClick={openImageModal} /> 
                </div>
                {/*<ImageSlider images={[festival.image1, festival.image2, festival.image3]} />*/}
                <p className='festival-description'>{festival.detail_description}</p>
                <hr className="line"/>
                <div className='information'>
                    <p><FaRegCalendarCheck className="icon-style"/> {festival.date.join(' ~ ')}</p>
                    <p><IoLocationSharp className="icon-style"/> {festival.detail_location}</p>
                    <p><IoCall className="icon-style"/> {festival.tel}</p>
                    <p><MdOutlineSchedule className="icon-style"/> {festival.time}</p>
                    <p><BiWon  className="icon-style"/> {festival.pay}</p> 
                </div>
                <hr className="line"/>
                <h2>길찾기</h2>
                <div className='tip'>마커를 누르면 상세보기가 가능합니다.</div>
                <div className="mapContainer">
                    <div id="map" style={{width:'100%', height:'450px', zIndex: 0}}></div>
                </div>
                <Modal
                isOpen={isImageModalOpen}
                onRequestClose={closeImageModal}
                contentLabel="Image Modal"
                className="modal-img-content"
                overlayClassName="modal-overlay">
                    <ImageSlider images={[festival.image1, festival.image2, festival.image3]} />
                    <IoMdCloseCircle onClick={closeImageModal} className="close-button" />
                </Modal>

                <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Map Modal"
                className="modal-map-content"
                overlayClassName="modal-overlay">
                    {coords && <iframe src={`https://map.kakao.com/link/map/${festival.name},${coords.getLat()},${coords.getLng()}`} style={{width: '100%', height: '100%'}}></iframe>}
                    <IoMdCloseCircle onClick={closeModal} className="close-button" />
                </Modal>
            </div>
            
        </div>
    );
};

export default FestivalDetail;
