# 미션 - 인스타 스토리 API

## 🎯 서버 세팅 방식
- setup.sh 스크립트를 실행하여 서버를 세팅한다.
- setup.sh 스크립트는 다음과 같은 작업을 수행한다.
    - orm `typeorm, prisma`, 패키지 매니저 `npm, yarn, pnpm` 선택
    - npm install | yarn | pnpm install 실행

```bash
./setup.sh
```

## 🔍 진행 방식

- 미션은 **기능 요구 사항, 프로그래밍 요구 사항, 과제 진행 요구 사항** 세 가지로 구성되어 있다.
- 세 개의 요구 사항을 만족하기 위해 노력한다. 특히 기능을 구현하기 전에 기능 목록을 만들고, 기능 단위로 커밋 하는 방식으로 진행한다.
- 기능 요구 사항에 기재되지 않은 내용은 스스로 판단하여 구현한다.

## 📮 미션 제출 방법

- 미션 구현을 완료한 후 GitHub PR 요청을 통해 제출합니다.

### 테스트 실행 가이드

- 터미널에서 `npm run test` 명령을 실행하여 모든 테스트가 아래와 같이 통과하는지 확인한다.

```
Ran all test suites.
```

---

## 🚀 기능 요구 사항
인스타 스토리와 유사한 형태의 게시글을 위한 API를 구현한다.

예시)
1. 스토리를 생성한다.
2. 12 or 24시간이내 스토리를 조회한다.

총 2개의 API 엔드포인트로 구성한다.
  - 스토리를 생성하는 API
    - 프론트엔드 관점에서 스토리에는 `제목`, `이미지`, `해시태그`, `작성자 이름`이 포함되어 구성된어야한다. 
    - 스토리를 생성할 때, 스토리의 유효기간 `12시간 | 24시간` 을 설정할 수 있다.
    - `작성자 이름`의 경우, 현재 로그인한 유저의 이름을 가져온다고 가정한다.
    - `해시태그`의 경우, `#`을 포함한 `문자열`로 구성되어야하고, 중복시 하나의 `해시태그`로 인식한다.
    ```
    예시) #어쩌다 #Nest와 #어쩌다 #스터디에서 #어쩌다는 같은 식별자를 가진 하나의 해시태그이다. 
    ```

  - 스토리를 조회하는 API 
    - 스토리를 조회하는 시점으로부터 `12시간 | 24시간 이전` 에 생성된 스토리만 조회할 수 있다.
    - 스토리 조회 시, `해시태그`의 정보를 함께 조회할 수 있다.

### 공통 필수 예외처리 사항

- API에 요청받은 Body 값의 타입을 검증하여 올바르지 않은 타입일 경우 `400 BadRequest` 에러를 리턴해야한다.
- API에 요청받은 Body 값의 필수 값이 누락되거나/빈 값인 경우 `400 BadRequest` 에러를 리턴해야한다.


### API 요청/응답 요구 사항
1. 모든 API의 요청/응답은 DTO를 통해 TypeSafe하게 이루어져야한다.
2. DTO의 타입은 `class-validator`를 이용하여 검증한다.
3. DTO 내부 요소의 명칭은 `camelCase`로 작성한다.

#### 요청
- 유효기간은 `12시간 | 24시간`의 `number` 형식이다.
```
validTime : 12 | 24
```

- 제목은 `string` 형식이다.
```
title : '어쩌다 Nest'
```

- 작성자 이름은 `string` 형식이다.
```
author : '어쩌다'
```

- 이미지는 `url 형태의 문자열` 형식이다.
```
image : https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
```

- 해시태그는 `#`을 포함한 문자열 리스트 형식이다.
```
hashtags : [ '#어쩌다', '#Nest', '#당근' ]
```

- 스토리 조회시 `Pagination`을 지원한다.
```
page : 1
limit : 10
```

#### 응답
- 정상적으로 스토리가 생성될 시 생성된 데이터를 리턴한다.
```json
{
  "id" : 1,
  "createdAt" : "2023-11-21T12:00:00.000Z",
  "validTime" : 24,
  "title" : "어쩌다 Nest",
  "author" : "어쩌다",
  "image" : "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "hashtags" : [ "#어쩌다", "#Nest", "#당근" ]
}
```

- 정상적으로 스토리가 목록 조회될 시 조회된 데이터를 리턴한다.
```json
{
  "data" : [
    {
      "id" : 1,
      "createdAt" : "2023-11-21T12:00:00.000Z",
      "validTime" : 24,
      "title" : "어쩌다 Nest",
      "author" : "어쩌다",
      "image" : "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "hashtags" : [ "#어쩌다", "#Nest", "#당근" ]
    },{
      "id" : 2,
      "createdAt" : "2023-11-23T12:00:00.000Z",
      "validTime" : 12,
      "title" : "NestJs",
      "author" : "어쩌다가 팀장",
      "image" : "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "hashtags" : [ "#어쩌다", "#Nest", "#당근" ]
    }
  ],
  "page" : 1,
  "totalPage" : 1,
  "limit" : 10
}
```

---

## 🎯 프로그래밍 요구 사항

- **Javascript 코드가 아닌 Typescript 코드로만 구현해야 한다.**
- **Swagger**를 이용하여 API 명세를 작성한다.
- **package.json**에 명시된 라이브러리만을 이용하여 구현한다.
- **eslint**, **prettier** 등의 코드 포맷팅 라이브러리를 이용하여 제공된 코드 컨벤션에 맞추어 코드를 작성한다.
- `node`, `npm` 버전은 `package.json`에 명시된 버전을 사용한다. [Volta를 이용하여 node 버전을 관리한다.](https://docs.volta.sh/guide/getting-started)


- **(선택 사항)** API 구현이 완료되고, 유닛 테스트, E2E 테스트등 모든 테스트 코드를 작성하여 테스트를 통과하면 굿!
---

## ✏️ 과제 진행 요구 사항

- 미션은 [nest-insta-story-2](https://github.com/eojjeoda-nest/nest-insta-story-2) 저장소를 Fork & Clone 하고 시작한다.
- **기능을 구현하기 전 `README.md`에 구현할 기능/예외처리를 목록으로 정리**해 추가한다.