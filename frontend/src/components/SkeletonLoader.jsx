import styled, { keyframes } from "styled-components";

const shineLoadingImage = keyframes`
  0% {
    background-position: -32px;
  }
  40%, 100% {
    background-position: 208px;
  }
`;

const shineLoadingContainerItems = keyframes`
  0% {
    background-position: -100px;
  }
  40%, 100% {
    background-position: 140px;
  }
`;

const SkeletonCard = styled.div`
  width: 100%;
  max-width: 350px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 20px auto;
`;

const LoadingImage = styled.div`
  height: 180px;
  background-image: linear-gradient(
    90deg,
    #ececec 0px,
    #f4f4f4 40px,
    #ececec 80px
  );
  background-size: 250px;
  animation: ${shineLoadingImage} 2s infinite ease-out;
`;

const LoadingContent = styled.div`
  padding: 15px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingMainText = styled.div`
  height: 12px;
  width: 65%;
  margin-bottom: 10px;
  background: #ececec;
  background-image: linear-gradient(
    90deg,
    #ececec 0px,
    #ddd 40px,
    #ececec 80px
  );
  background-size: 250px;
  border-radius: 10px;
  animation: ${shineLoadingContainerItems} 2s infinite ease-out;
`;

const LoadingSubText = styled.div`
  height: 10px;
  width: 50%;
  background: #ececec;
  background-image: linear-gradient(
    90deg,
    #ececec 0px,
    #ddd 40px,
    #ececec 80px
  );
  background-size: 250px;
  border-radius: 10px;
  animation: ${shineLoadingContainerItems} 2s infinite ease-out;
`;

const LoadingBtn = styled.div`
  width: 80px;
  height: 30px;
  background: #ececec;
  background-image: linear-gradient(
    90deg,
    #ececec 0px,
    #ddd 40px,
    #ececec 80px
  );
  background-size: 250px;
  border-radius: 5px;
  animation: ${shineLoadingContainerItems} 2s infinite ease-out;
`;

const SkeletonLoader = () => (
  <SkeletonCard>
    <LoadingImage />
    <LoadingContent>
      <LoadingMainText />
      <LoadingSubText />
      <LoadingBtn />
    </LoadingContent>
  </SkeletonCard>
);

export default SkeletonLoader;
