# 전국 야구장 날씨 조회 어플 (with 기상청 공공API)    

> 공공데이터포털에서 제공하는 기상청 단기예보 API의 초단기예보조회를 사용하였습니다. 경도와 위도를 지도상의 x, y좌표로 바꾸는 함수는 https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=javaking75&logNo=220089575454 를 참고하였습니다.   

1. 기술 스택      
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">   
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">   
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white">      
<img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">   


2. 사용 방법   
- 지도의 오른쪽 상단 위에 있는 지역 리스트 혹은 지도 위의 마커를 클릭합니다. 클릭 시 지도 하단 부에 기준 시간(30분)으로부터 5~6시간까지의 초단기예보를 조회할 수 있습니다. 시간, 온도, 강수량, 날씨, 습도, 강수형태를 알 수 있습니다.

3. 라이브러리   
- react-query : 데이터 캐싱 관련 라이브러리      
- axios : 비동기 통신 관련 라이브러리   
- classnames : 조건부 클래스네임 지정   
- dayjs : 날짜 관련 라이브러리   
- react-indiana-drag-scroll : 가로 스크롤   
- recoil : 전역 상태 관리   

4. 폴더구조   
- 추후 수정   

5. 어려웠던 점 및 개선할 점   
- kakaoMap api가 자바스크립트 + html로 작성하도록 되어 있어서 react에 적용하는 것이 어려웠습니다. 특히 Strict Mode로 인해 맵이 두번 만들어져 확대, 축소시에 기존의 맵이 남아 있어서 줌이 자연스럽지 않았습니다. 그래서 플래그 변수 값을 두고, 그 값이 바뀌면 맵이 두번 만들어지지 않도록 하였습니다.   
- 결과값을 테이블 안에 정리하여 화면 맨 하단에 띄우고자 했습니다. 그래서 position을 absolute로 두었는데, 모바일 화면에서 탭의 높이까지 하단으로 계산하여 원하는 대로 구현되지 않았습니다. 그래서 position을 fixed로 바꾸어서 하단 탭의 유무에 상관 없이 아래에 고정될 수 있도록 하였습니다.   
- kakao map 타입을 지정할 수가 없어서 any를 사용할 수 밖에 없었습니다. 추후에 타입 파일이 생기면 추가할 예정입니다.   

6. 예시   
![clickBtn](https://user-images.githubusercontent.com/88841429/195175567-103fb5d7-940a-4713-890c-fca0abea8f29.gif) 
![clickmarker](https://user-images.githubusercontent.com/88841429/195175591-335e12d0-9042-4b3e-ab3a-c479c71a7fcb.gif)
