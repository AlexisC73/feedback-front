import { SVGProps } from "react";

export function BurgerMenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M3 12h18M3 18h18"></path></svg>
  )
}

export function CloseMenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"></path></svg>
  )
}

export function SuggestionsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="0.96em" height="1em" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clip-path="url(#clip0_12_3)">
      <path d="M11.5006 2.27418C13.7374 2.27418 15.8386 3.12773 17.4235 4.68168C19.013 6.24013 19.8884 8.31387 19.8884 10.5209C19.8884 12.3358 19.3002 14.0575 18.1875 15.4998C17.251 16.7138 15.9721 17.6593 14.5363 18.21L14.2263 18.3219L14.2295 19.1478H14.5978C14.8599 19.1478 15.0725 19.3577 15.0725 19.6165C15.0725 19.8466 14.9045 20.038 14.6831 20.0777L14.5978 20.0853H14.233L14.2369 21.1051H14.5978C14.8599 21.1051 15.0725 21.3151 15.0725 21.5739C15.0725 21.804 14.9045 21.9954 14.6831 22.0351L14.5978 22.0426H14.2405L14.2461 23.5295C14.2466 23.6542 14.1968 23.7738 14.1077 23.8621C14.0409 23.9283 13.9561 23.9728 13.8646 23.9909L13.7714 24H9.22857C9.10238 24 8.98132 23.9504 8.89226 23.8621C8.82543 23.7959 8.78071 23.712 8.76272 23.6216L8.75382 23.5295L8.75947 22.0426H8.40218C8.14002 22.0426 7.92743 21.8327 7.92743 21.5739C7.92743 21.3438 8.0954 21.1524 8.31685 21.1127L8.40218 21.1051H8.76303L8.76693 20.0853H8.40218C8.14002 20.0853 7.92743 19.8754 7.92743 19.6165C7.92743 19.3865 8.0954 19.195 8.31685 19.1553L8.40218 19.1478H8.77049L8.77362 18.3219C7.19333 17.7867 5.78461 16.7783 4.77795 15.4548C3.66144 13.9868 3.08553 12.2387 3.11249 10.3994C3.14368 8.27169 4.03535 6.24702 5.62315 4.69827C7.13092 3.22763 9.07058 2.37717 11.1159 2.28278L11.4397 2.27418H11.5006ZM13.291 22.0426H9.70901L9.70517 23.0625H13.2949L13.291 22.0426ZM13.2835 20.0852H9.71642L9.71258 21.1051H13.2874L13.2835 20.0852ZM11.5004 3.21163L11.4463 3.21182C7.50035 3.23915 4.11867 6.53685 4.06189 10.4129C4.01404 13.6777 6.20248 16.6044 9.38391 17.5302C9.55754 17.5807 9.6843 17.7231 9.71646 17.894L9.72444 17.9815L9.71998 19.1477H13.28L13.2756 17.9815C13.2748 17.7731 13.4135 17.5891 13.6161 17.5302C16.7501 16.6182 18.9389 13.7359 18.9389 10.5208C18.9389 8.5655 18.1631 6.72805 16.7544 5.34688C15.3488 3.96871 13.4847 3.21163 11.5004 3.21163ZM12.3288 4.99443C12.5506 4.99443 12.7305 5.17199 12.7305 5.39104V5.7126C13.2099 5.83218 13.662 6.02005 14.0756 6.26511L14.3039 6.03889C14.4609 5.88336 14.716 5.88336 14.873 6.03889L16.0461 7.2012C16.2023 7.35599 16.2023 7.60634 16.0461 7.76113L15.8158 7.98931C16.0631 8.39909 16.2527 8.84703 16.3734 9.32211H16.6965C16.9183 9.32211 17.0982 9.49967 17.0982 9.71872V11.3639C17.0982 11.5829 16.9183 11.7605 16.6965 11.7605H16.3734C16.2527 12.2356 16.0631 12.6835 15.8157 13.0933L16.046 13.3214C16.2022 13.4762 16.2022 13.7266 16.046 13.8813L14.8729 15.0437C14.716 15.1992 14.4609 15.1992 14.3039 15.0437L14.0756 14.8174C13.662 15.0625 13.2099 15.2504 12.7305 15.37V15.6915C12.7305 15.9106 12.5506 16.0881 12.3288 16.0881H10.6711C10.4493 16.0881 10.2695 15.9106 10.2695 15.6915V15.37C9.79001 15.2504 9.3379 15.0625 8.9243 14.8174L8.696 15.0437C8.53905 15.1992 8.28397 15.1992 8.12697 15.0437L6.95387 13.8813C6.79767 13.7266 6.79767 13.4762 6.95387 13.3214L7.18417 13.0933C6.93682 12.6835 6.74721 12.2356 6.62653 11.7605H6.30341C6.08156 11.7605 5.90173 11.5829 5.90173 11.3639V9.71872C5.90173 9.49967 6.08156 9.32211 6.30341 9.32211H6.62653C6.74721 8.84703 6.93682 8.39909 7.18417 7.98931L6.95387 7.76113C6.79767 7.60634 6.79767 7.35599 6.95387 7.2012L8.12697 6.03889C8.28392 5.88336 8.539 5.88336 8.696 6.03889L8.9243 6.26511C9.33786 6.02005 9.78996 5.83218 10.2695 5.7126V5.39104C10.2695 5.17199 10.4493 4.99443 10.6711 4.99443H12.3288ZM11.5 7.72128C9.92811 7.72128 8.65384 8.98386 8.65384 10.5413C8.65384 12.0988 9.92811 13.3614 11.5 13.3614C13.0719 13.3614 14.3462 12.0988 14.3462 10.5413C14.3462 8.98386 13.0719 7.72128 11.5 7.72128ZM22.5253 11.8732C22.7875 11.8732 23 12.0831 23 12.342C23 12.5721 22.832 12.7635 22.6106 12.8032L22.5253 12.8107H22.0269C21.7648 12.8107 21.5522 12.6008 21.5522 12.342C21.5522 12.1119 21.7201 11.9205 21.9416 11.8808L22.0269 11.8732H22.5253ZM0.97309 11.8732C1.23525 11.8732 1.44784 12.0831 1.44784 12.342C1.44784 12.5721 1.27986 12.7635 1.05842 12.8032L0.97309 12.8107H0.474748C0.212592 12.8107 0 12.6008 0 12.342C0 12.1119 0.167974 11.9205 0.389422 11.8808L0.474748 11.8732H0.97309ZM3.11161 3.44944L3.18622 3.50934L3.64521 3.96046C3.83102 4.14313 3.83169 4.4399 3.64673 4.62337C3.55396 4.71538 3.43214 4.76141 3.31027 4.76141C3.21941 4.76141 3.12854 4.73581 3.04971 4.68461L2.97534 4.62487L2.51635 4.17374C2.33054 3.99107 2.32987 3.69431 2.51483 3.51084C2.67672 3.35026 2.92707 3.32972 3.11161 3.44944ZM20.4852 3.51084C20.647 3.67137 20.6667 3.91869 20.5447 4.10035L20.4836 4.17374L20.0247 4.62487C19.932 4.7159 19.8109 4.76141 19.6897 4.76141C19.5679 4.76141 19.446 4.71538 19.3533 4.62337C19.1914 4.46283 19.1717 4.21555 19.2938 4.03387L19.3548 3.96046L19.8138 3.50934C19.9996 3.32671 20.3002 3.32742 20.4852 3.51084ZM11.5 0C11.733 0 11.9269 0.165814 11.9671 0.384489L11.9747 0.468749V0.958545C11.9747 1.21744 11.7622 1.42729 11.5 1.42729C11.2669 1.42729 11.0731 1.26148 11.0329 1.04281L11.0253 0.958545V0.468749C11.0253 0.209859 11.2378 0 11.5 0Z" fill="white"/>
      </g>
      <defs>
      <clipPath id="clip0_12_3">
      <rect width="0.96em" height="1em" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  )
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1.3em" height="1em" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0.968262 4.85894L4.49995 8.39062L11.9999 0.890625" stroke="#AD1FEA" strokeWidth="2"/>
    </svg>
  )
}

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1.29em" height="1em" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 6L5 2L9 6" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

export function MessageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1.125em" height="1em" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path id="Path" d="M2.62074 16H1.34534L2.24718 15.0895C2.73344 14.5986 3.0371 13.9601 3.11873 13.2674C1.03637 11.8878 0 9.88917 0 7.79388C0 3.92832 3.51913 0 9.0305 0C14.8692 0 18 3.61479 18 7.45522C18 11.321 14.8361 14.9333 9.0305 14.9333C8.0135 14.9333 6.95226 14.7963 6.00478 14.5448C5.10787 15.4735 3.89262 16 2.62074 16Z" fill="currentColor"/>
    </svg>
  )
}

export function EmptyFeedbackIcon() {
  return (
    <svg width="131" height="137" viewBox="0 0 131 137" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5">
      <path d="M62.8268 19.7428C33.7105 19.7372 10.1005 43.3321 10.0874 72.4484C10.0743 101.565 33.6632 125.181 62.7794 125.201C91.8957 125.222 115.518 101.639 115.546 72.5228C115.562 58.5303 110.015 45.1053 100.126 35.2054C90.2379 25.3055 76.8193 19.7428 62.8268 19.7428Z" stroke="#3A4374" strokeWidth="1.04545" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="90.4653" cy="55.3186" rx="2.436" ry="3.62355" fill="#231F20"/>
      <path d="M0.891602 56.8512L124.722 29.4462L100.362 22.3412C100.362 22.3412 87.1666 0.467961 83.6446 0.0112108C80.1225 -0.445539 16.1166 13.2062 16.1166 13.2062L12.0566 44.0216L0.891602 56.8512Z" fill="#3A4374"/>
      <path d="M26.6726 131.048L12.6758 108.921L73.86 98.4561L78.0621 119.659L84.2739 100.131L115.576 106.312L109.212 131.048H26.6726Z" fill="#3A4374"/>
      <path d="M105.074 83.0667L110.714 82.286L113.628 103.339C113.831 104.805 112.807 106.158 111.341 106.361L111.009 106.407C109.543 106.61 108.191 105.586 107.988 104.12L105.074 83.0667H105.074Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M107.487 104.201C107.709 105.775 109.054 106.947 110.643 106.952C110.783 106.951 110.922 106.94 111.059 106.921L111.384 106.87C112.224 106.76 112.984 106.317 113.495 105.642C114.006 104.967 114.226 104.115 114.104 103.277L111.212 82.2262C111.198 82.0924 111.128 81.9707 111.019 81.8913C110.912 81.8089 110.777 81.7724 110.643 81.7898L105.01 82.5713C104.733 82.6081 104.538 82.8624 104.574 83.1397L107.487 104.201ZM108.492 104.059L105.65 83.5051L110.278 82.9164L113.12 103.47C113.283 104.655 112.457 105.749 111.273 105.916H110.938C109.751 106.073 108.659 105.244 108.492 104.059Z" fill="#3A4374"/>
      <rect x="100.742" y="64.4839" width="9.18575" height="20.7872" transform="rotate(-7.88 100.742 64.4839)" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M103.285 85.4945C103.374 85.558 103.48 85.5933 103.589 85.596L103.65 85.5859L112.785 84.3273C113.062 84.2904 113.258 84.0362 113.222 83.7589L110.369 63.1645C110.354 63.0302 110.285 62.9077 110.178 62.8254C110.071 62.743 109.935 62.7079 109.801 62.7281L100.666 63.9867C100.534 64.0072 100.415 64.076 100.331 64.1795C100.251 64.2873 100.218 64.4227 100.24 64.5551L103.092 85.1596C103.103 85.2943 103.174 85.4169 103.285 85.4945ZM104.026 84.51L101.316 64.9205L109.436 63.804L112.146 83.3935L104.026 84.51Z" fill="#3A4374"/>
      <rect x="105.568" y="99.3416" width="9.18575" height="36.1543" rx="3.248" transform="rotate(-7.88 105.568 99.3416)" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M109.568 132.022C109.826 133.877 111.411 135.258 113.283 135.26L113.79 135.27L116.47 134.895C118.516 134.606 119.944 132.719 119.667 130.672L115.607 101.237C115.324 99.1884 113.434 97.757 111.385 98.0399L108.705 98.4053C107.721 98.5442 106.831 99.0658 106.229 99.8568C105.627 100.651 105.368 101.652 105.508 102.638L109.568 132.022ZM111.527 99.0143C111.652 99.0043 111.777 99.0043 111.902 99.0143L111.872 99.0245C113.235 99.0318 114.385 100.039 114.572 101.389L118.632 130.824C118.813 132.306 117.775 133.659 116.297 133.869L113.618 134.245C112.138 134.42 110.788 133.385 110.573 131.91L106.513 102.475C106.404 101.755 106.595 101.022 107.041 100.445C107.475 99.8621 108.126 99.478 108.847 99.3797L111.527 99.0143Z" fill="#3A4374"/>
      <circle cx="104.564" cy="58.6072" r="24.3904" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M79.6722 59.7295C80.2774 73.0274 91.2316 83.4991 104.543 83.5051C105.704 83.5046 106.864 83.4266 108.015 83.2717C121.613 81.348 131.096 68.7924 129.228 55.1866C127.405 42.0003 115.537 32.5777 102.281 33.7929C89.0246 35.0081 79.067 46.4316 79.6722 59.7295ZM101.244 34.9374C102.338 34.7876 103.44 34.713 104.543 34.7141H104.584C116.48 34.7656 126.533 43.5472 128.183 55.3287C129.508 64.9018 124.936 74.3306 116.598 79.2181C108.261 84.1056 97.8002 83.4891 90.0946 77.6561C82.3889 71.8231 78.9559 61.9225 81.3967 52.5714C83.8374 43.2203 91.6711 36.2604 101.244 34.9374Z" fill="#3A4374"/>
      <circle cx="104.564" cy="58.6072" r="19.8128" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M84.2652 59.3276C84.6425 70.2601 93.6144 78.9276 104.553 78.9275C105.487 78.9286 106.42 78.8641 107.345 78.7346C118.18 77.2304 125.874 67.4113 124.745 56.5309C123.615 45.6504 114.067 37.6218 103.154 38.3757C92.241 39.1297 83.8879 48.3952 84.2652 59.3276ZM101.864 39.5252C102.755 39.4041 103.654 39.343 104.553 39.3425C114.942 39.3646 123.446 47.6114 123.787 57.9942C124.128 68.3769 116.184 77.1641 105.819 77.8681C95.4547 78.5721 86.3951 70.9399 85.329 60.6064C84.263 50.2729 91.5738 40.9519 101.864 39.5252Z" fill="#3A4374"/>
      <path d="M127.858 113.59C126.518 111.889 124.82 110.503 122.885 109.53C117.069 106.485 110.4 106.586 104.28 108.515C102.108 109.205 97.8953 110.189 97.672 113.072C97.6886 114.253 98.476 115.283 99.6107 115.61C100.721 115.898 101.881 115.943 103.011 115.742C101.401 115.698 99.8105 116.099 98.413 116.899C97.1036 117.822 96.383 119.842 97.4589 121.07C97.9344 121.581 98.5538 121.935 99.2351 122.085C100.716 122.493 102.282 122.471 103.752 122.024C102.162 122.329 100.612 122.816 99.1336 123.476C98.2404 123.872 97.2457 124.572 97.3472 125.506C97.4487 126.44 98.3622 126.866 99.1945 127.15C100.946 127.751 102.775 128.093 104.625 128.165C103.028 128.455 101.518 129.104 100.21 130.063C98.1795 131.768 98.1795 135.006 100.93 135.93C101.813 136.188 102.732 136.294 103.65 136.245C111.77 136.245 121.494 135.23 126.995 128.47C129.703 125.306 130.675 121.011 129.594 116.99C129.218 115.764 128.63 114.613 127.858 113.59Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M100.768 136.387C101.683 136.655 102.637 136.768 103.589 136.722L103.62 136.742C111.659 136.732 121.626 135.818 127.381 128.784C130.204 125.491 131.212 121.013 130.071 116.828C129.666 115.553 129.044 114.359 128.234 113.295C126.853 111.518 125.095 110.069 123.087 109.053C117.627 106.272 110.877 105.896 104.097 108.038L103.447 108.231C103.425 108.237 103.402 108.244 103.379 108.251C100.963 108.992 97.3652 110.095 97.1339 113.031C97.1225 114.308 97.8907 115.462 99.0726 115.945C98.714 116.087 98.3734 116.271 98.0576 116.493C97.1649 117.136 96.5715 118.114 96.4133 119.203C96.2942 119.985 96.5117 120.782 97.0121 121.395C97.5516 121.983 98.2613 122.388 99.0421 122.552C99.2224 122.606 99.4053 122.65 99.5902 122.684L98.8696 122.989C97.4689 123.648 96.6873 124.704 96.8396 125.577C96.9918 126.45 97.6719 127.14 99.0218 127.607C100.013 127.952 101.032 128.213 102.067 128.388C101.27 128.685 100.529 129.114 99.8744 129.657C98.6932 130.652 98.1162 132.191 98.3519 133.717C98.603 134.984 99.5316 136.011 100.768 136.387ZM99.3365 123.872C100.397 123.395 101.498 123.011 102.625 122.725C103.051 122.675 103.472 122.59 103.884 122.471C104.139 122.388 104.289 122.124 104.229 121.862C104.164 121.6 103.905 121.435 103.64 121.486C103.234 121.568 102.818 121.659 102.412 121.76C101.393 121.894 100.359 121.825 99.3669 121.557C98.7875 121.439 98.2571 121.149 97.8444 120.725C97.5311 120.326 97.3986 119.815 97.479 119.314C97.5971 118.499 98.0401 117.767 98.7072 117.284C99.5897 116.726 100.598 116.398 101.641 116.33C101.876 116.325 102.108 116.299 102.337 116.273C102.583 116.246 102.825 116.219 103.062 116.219C103.335 116.187 103.536 115.946 103.518 115.67C103.487 115.399 103.253 115.197 102.98 115.204C102.951 115.206 102.921 115.208 102.892 115.21C102.472 115.238 102.035 115.268 101.59 115.315C100.976 115.355 100.359 115.279 99.7729 115.092C98.8554 114.834 98.2082 114.014 98.1692 113.062C98.3517 110.79 101.614 109.806 103.766 109.156L103.772 109.154L104.432 108.951C110.958 106.921 117.424 107.276 122.651 109.966C124.526 110.911 126.167 112.264 127.452 113.925C128.194 114.893 128.764 115.981 129.137 117.142C130.172 121.004 129.229 125.127 126.62 128.155C121.139 134.864 111.466 135.737 103.64 135.737C102.781 135.793 101.918 135.697 101.092 135.453C100.201 135.197 99.5273 134.464 99.3466 133.555C99.1664 132.382 99.6178 131.202 100.534 130.449C101.793 129.548 103.234 128.934 104.757 128.652C105.001 128.588 105.161 128.355 105.132 128.104C105.106 127.853 104.897 127.661 104.645 127.658C102.842 127.581 101.06 127.239 99.3568 126.643C98.7072 126.429 97.9358 126.166 97.8546 125.414C97.7734 124.663 98.8594 124.085 99.3365 123.872Z" fill="#3A4374"/>
      <path d="M71.2618 58.9929C71.2618 58.9929 83.6245 77.5674 76.1439 77.8313C68.6634 78.0952 68.0239 76.1362 68.0239 76.1362" fill="white"/>
      <path d="M74.804 78.42C68.5313 78.42 67.6279 76.7046 67.5061 76.39C67.4185 76.1129 67.5668 75.8162 67.8411 75.7201C68.1155 75.6331 68.4091 75.7821 68.5008 76.055C68.5008 76.055 69.4143 77.6283 76.1235 77.3847C76.7911 77.4462 77.4334 77.1132 77.7678 76.5321C79.3715 73.416 73.3018 63.0833 70.8252 59.3684C70.6873 59.1284 70.7583 58.8227 70.9878 58.668C71.2172 58.5132 71.5272 58.562 71.6981 58.7797C72.642 60.2007 80.8331 72.7867 78.7016 77.0497C78.204 77.9777 77.2156 78.5351 76.1641 78.4809L74.804 78.42Z" fill="#3A4374"/>
      <ellipse cx="105.69" cy="57.988" rx="4.4863" ry="7.64295" fill="#C0C5DC"/>
      <ellipse cx="50.7892" cy="57.988" rx="3.42055" ry="6.18135" fill="#3A4374"/>
      </g>
    </svg>
  )
}
