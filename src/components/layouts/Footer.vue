<template>
  <div class="footer-wrapper display-none-print">
    <div class="-768:hidden bg-[#F5F6FA]">
      <div class="footer">
        <div class="container py-[32px] mt-[20px]">
          <div class="grid grid-cols-12">
            <div class="col-span-2 -1024:col-span-3">
              <img
                class="cursor-pointer max-w-[136px] translate-y-[-50%] z-20 md:mx-auto"
                src="@/static/img/footer-logo_white.png"
                alt="footer-logo"
                @click="toTop()"
              />
            </div>
            <!--            socal icons-->

            <div class="col-span-6 -1024:col-span-9 flex justify-between w-full">
              <div class="md:mt-[16px] md:text-center">
                <div class="flex flex-col gap-[16px]">
                  <!--                  <pre>{{ footerItems.menu }}</pre>-->
                  <p v-for="(item, index) in footerItems?.menu" :key="index" class="footer-text">
                    <router-link v-if="item?.url" :to="`/${item?.url}`">{{
                      $t(item?.title)
                    }}</router-link>
                  </p>
                </div>
              </div>

              <div class="">
                <div class="flex items-center group">
                  <div class="flex items-center">
                    <icon
                      class="duration-200 group-hover:translate-x-[-2px] min-w-[20px]"
                      name="gray_phone"
                    />
                    <a :href="`tel:${footerItems.phone}`" class="footer-text ml-[8px]">{{
                      footerItems.phone
                    }}</a>
                  </div>

                  <div class="ml-[80px] lg:mt-[24px] socLinks">
                    <!-- social-networks -->
                    <div class="flex">
                      <a
                        v-for="(item, index) in footerItems.links"
                        :key="index"
                        :title="item.title"
                        :class="{ hidden: !item.url }"
                        class="transition-500 duration-500 hover:translate-y-[-3px] md:mx-[6px] mx-[6px] tooltip cursor-pointer"
                        :href="item.url"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <img
                          v-if="item.url"
                          :src="item.logo_footer_url"
                          class="max-w-[36px] object-cover"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div class="flex items-center mt-[22px] group">
                  <icon
                    class="duration-200 group-hover:translate-x-[-2px] min-w-[20px]"
                    name="gray_mail"
                  />
                  <a
                    :href="`mailto:${footerItems.email}`"
                    rel="noopener noreferrer"
                    class="footer-text ml-[8px]"
                    >{{ footerItems.email }}</a
                  >
                </div>
                <div class="flex items-center mt-[22px] group">
                  <icon
                    class="duration-200 group-hover:translate-x-[-2px] min-w-[20px]"
                    name="gray_location"
                  />
                  <a
                    href="https://yandex.uz/maps/org/194913734385/?ll=69.280987%2C41.314499&z=18.03"
                    rel="noopener noreferrer"
                    class="footer-text ml-[8px] max-w-[380px]"
                    >{{ footerItems.address }}</a
                  >
                </div>
              </div>
            </div>
            <!--            socal icons-->
            <div class="col-span-4 -1024:col-span-12 flex justify-center gap-[16px]">
              <a
                v-for="(socialLinks, index) in footerSocial"
                :key="index"
                :href="`https://${socialLinks.url}`"
                :title="socialLinks.title"
                target="_blank"
                class="w-[24px] h-[24px]"
              >
                <el-tooltip
                  v-if="socialLinks.title === 'Linkedin'"
                  class="tooltip-copy"
                  placement="top"
                  trigger="hover"
                  :content="$t('Linkedin')"
                >
                  <svg
                    v-if="socialLinks.title === 'Linkedin'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23 1H1V23H23V1ZM9.15742 7.15255C9.15742 6.46689 8.64317 5.95264 7.87133 5.95264C7.01425 5.95264 6.5 6.46689 6.5 7.15255C6.5 7.83822 7.01425 8.35339 7.78608 8.35247C8.64317 8.35247 9.15742 7.83822 9.15742 7.15255ZM6.5 16.5832H9.25V9.24989H6.5V16.5832ZM15.828 16.5832H18.4167V12.5756C18.4167 10.2729 17.3818 9.24989 16.0874 9.24989C14.7931 9.24989 14.1028 9.67614 13.7582 10.2729V9.24989H11.0833V16.5832H13.7572V12.5756C13.7572 11.3821 14.6208 11.2116 14.8793 11.2116C15.1378 11.2116 15.828 11.4673 15.828 12.5756V16.5832Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
                <el-tooltip
                  v-if="socialLinks.title === 'Facebook'"
                  class="tooltip-copy"
                  placement="top"
                  trigger="hover"
                  :content="$t('Facebook')"
                >
                  <svg
                    v-if="socialLinks.title === 'Facebook'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23 1H1V23H23V1ZM10.2813 23V15.2661H7.48694V12.0669H10.2813V9.62864C10.2813 6.85521 11.9224 5.32324 14.436 5.32324C15.6398 5.32324 16.8986 5.53923 16.8986 5.53923V8.26134H15.5112C14.145 8.26134 13.7188 9.11456 13.7188 9.98965V12.0669H16.7695L16.2816 15.2661H13.7188V23H10.2813Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
                <el-tooltip
                  v-if="socialLinks.title === 'Instagram'"
                  class="tooltip-copy"
                  placement="top"
                  trigger="hover"
                  :content="$t('Instagram')"
                >
                  <svg
                    v-if="socialLinks.title === 'Instagram'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 8.33325C11.0276 8.33325 10.0949 8.71956 9.40732 9.40719C8.71968 10.0948 8.33337 11.0275 8.33337 11.9999C8.33337 12.9724 8.71968 13.905 9.40732 14.5926C10.0949 15.2803 11.0276 15.6666 12 15.6666C12.9725 15.6666 13.9051 15.2803 14.5928 14.5926C15.2804 13.905 15.6667 12.9724 15.6667 11.9999C15.6667 11.0275 15.2804 10.0948 14.5928 9.40719C13.9051 8.71956 12.9725 8.33325 12 8.33325Z"
                      fill="#2B5E9B"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23 1H1V23H23V1ZM18.0047 7.15211C18.5689 7.15211 19.0263 6.69472 19.0263 6.1305C19.0263 5.56628 18.5689 5.10889 18.0047 5.10889C17.4405 5.10889 16.9831 5.56628 16.9831 6.1305C16.9831 6.69472 17.4405 7.15211 18.0047 7.15211ZM5.88892 12C5.88892 15.3746 8.62547 18.1111 12 18.1111C15.3746 18.1111 18.1111 15.3746 18.1111 12C18.1111 8.62544 15.3746 5.88889 12 5.88889C8.62547 5.88889 5.88892 8.62544 5.88892 12Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
                <el-tooltip
                  v-if="socialLinks.title === 'Telegram'"
                  class="tooltip-copy"
                  placement="top"
                  trigger="hover"
                  :content="$t('Telegram')"
                >
                  <svg
                    v-if="socialLinks.title === 'Telegram'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23 1H1V23H23V1ZM15.9905 17.9396C16.0704 17.8631 16.133 17.7704 16.1742 17.6678L18.2735 6.94665C18.2735 6.23162 17.3044 6.66339 17.3044 6.66339L5.51573 11.3466C5.51573 11.3466 4.95749 11.5402 5.00259 11.8966C5.04549 12.2558 5.50089 12.4191 5.50089 12.4191L8.46593 13.4289L15.5857 8.84851C15.5857 8.84851 15.996 8.59492 15.9834 8.84851C15.9834 8.84851 16.0565 8.8936 15.8349 9.1015C15.616 9.30994 10.2425 14.2022 10.2425 14.2022L10.235 14.2671L10.2232 14.2578L9.8558 17.5451C9.90746 17.5648 9.96324 17.5712 10.018 17.5637C10.0728 17.5562 10.1248 17.5351 10.1693 17.5022L12.0859 15.7341L15.072 18.0544C15.1683 18.1089 15.2751 18.1421 15.3853 18.1519C15.4954 18.1617 15.6064 18.1478 15.7108 18.1112C15.8152 18.0746 15.9105 18.016 15.9905 17.9396Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
                <el-tooltip
                  v-if="socialLinks.title === 'Youtube'"
                  class="tooltip-copy"
                  trigger="hover"
                  placement="top"
                  :content="$t('Youtube')"
                >
                  <svg
                    v-if="socialLinks.title === 'Youtube'"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1 1H23V23H1V1ZM8.41919 7.271L8.42024 16.729L17.4502 12.0163L8.41919 7.271Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
                <el-tooltip
                  v-if="socialLinks.title === 'Twitter'"
                  class="tooltip-copy"
                  placement="top"
                  trigger="hover"
                  :content="$t('Twitter')"
                >
                  <svg
                    v-if="socialLinks.title === 'Twitter'"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23 1H1V23H23V1Z"
                      fill="#2B5E9B"
                    />
                    <path
                      d="M10.4393 12.6186L5.03407 6H9.20001L12.7436 10.3391L17.1292 6H18.3535L13.2906 11.0091L19 18H14.8341L10.9865 13.2884L6.22427 18H5L10.4393 12.6186Z"
                      fill="white"
                    />
                  </svg>
                </el-tooltip>
                <el-tooltip
                  v-if="socialLinks.title === 'Tiktok'"
                  placement="top"
                  class="tooltip-copy"
                  trigger="hover"
                  :content="$t('Tiktok')"
                >
                  <svg
                    v-if="socialLinks.title === 'Tiktok'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1 1H23V23H1V1ZM18.5977 10.4933C18.7336 10.4933 18.8677 10.4853 19 10.4733V7.81102C16.8871 7.66279 15.197 6.04717 14.9766 4H12.6352C12.6352 4 12.6107 15.1161 12.6107 15.1702C12.6107 16.5407 11.373 17.6205 9.97139 17.6205C8.56982 17.6205 7.4341 16.5099 7.4341 15.1395C7.4341 13.769 8.56982 12.6584 9.97139 12.6584C10.0494 12.6584 10.1249 12.6685 10.2004 12.6786C10.2264 12.6821 10.2525 12.6856 10.2786 12.6887V10.2932C10.2544 10.2917 10.2302 10.29 10.206 10.2884C10.1283 10.2831 10.0505 10.2778 9.97139 10.2778C7.22596 10.2778 5 12.4544 5 15.1389C5 17.8234 7.22596 20 9.97139 20C12.7168 20 14.9428 17.8234 14.9428 15.1389V8.56182C15.7246 9.72422 17.0685 10.4933 18.5977 10.4933Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
                <el-tooltip
                  v-if="socialLinks.title === 'Vkontakte'"
                  placement="top"
                  class="tooltip-copy"
                  trigger="hover"
                  :content="$t('Vkontakte')"
                >
                  <svg
                    v-if="socialLinks.title === 'Vkontakte'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23 1H1V23H23V1ZM19.8447 15.6892C19.7724 15.5562 19.4588 14.9791 18.2685 13.8732C17.7035 13.3487 17.4086 13.0813 17.3775 12.7861C17.335 12.3815 17.7885 11.9248 18.7219 10.6819C19.7051 9.3716 20.098 8.57155 19.9753 8.22931C19.8589 7.90307 19.1361 7.9893 19.1361 7.9893L16.7298 8.00441C16.7298 8.00441 16.5511 7.98041 16.4186 8.05952C16.2897 8.13686 16.2062 8.31732 16.2062 8.31732C16.2062 8.31732 15.8257 9.33071 15.3172 10.193C14.2469 12.0118 13.8185 12.1078 13.6425 11.9949C13.3006 11.7737 13.3169 11.1805 13.3312 10.662C13.334 10.5616 13.3367 10.4641 13.3367 10.3726C13.3367 9.96698 13.3508 9.6158 13.363 9.31314C13.4039 8.30034 13.4228 7.83085 12.8157 7.68439C12.5553 7.62038 12.3624 7.57949 11.6939 7.57238C10.8343 7.56349 10.108 7.57505 9.69644 7.77595C9.42265 7.91018 9.21197 8.20886 9.34086 8.22575C9.49998 8.2462 9.86001 8.32265 10.0502 8.58133C10.2974 8.91646 10.2885 9.67029 10.2885 9.67029C10.2885 9.67029 10.4307 11.7451 9.9569 12.0029C9.63333 12.1798 9.18885 11.8189 8.23324 10.169C7.74432 9.3236 7.37452 8.38843 7.37452 8.38843C7.37452 8.38843 7.3034 8.21331 7.17628 8.11997C7.02161 8.00707 6.80648 7.96974 6.80648 7.96974L4.52101 7.9813C4.52101 7.9813 4.17788 7.98485 4.05165 8.13419C3.93964 8.26754 4.04276 8.52977 4.04276 8.52977C4.04276 8.52977 5.8322 12.6936 7.85899 14.8048C9.71778 16.7392 11.8281 16.5649 11.8281 16.5649H12.7846C12.7846 16.5649 13.0735 16.5809 13.2211 16.4227C13.3562 16.276 13.3518 16.0494 13.3518 16.0494C13.3518 16.0494 13.3331 14.7657 13.9287 14.5773C14.2832 14.4645 14.6988 14.9408 15.1485 15.4563C15.443 15.7939 15.7521 16.1482 16.0684 16.3649C16.672 16.781 17.1325 16.6903 17.1325 16.6903L19.2695 16.6601C19.2695 16.6601 20.3878 16.5907 19.8571 15.7116C19.8541 15.7065 19.8501 15.6991 19.8447 15.6892Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
              </a>
            </div>
            <!--            socal icons-->
          </div>
          <div class="w-full mt-[48px] grid grid-cols-2">
            <div
              v-for="(item, index) in footerItems?.sponsors"
              :key="index"
              class="flex items-center w-full my-[10px]"
            >
              <a
                class="flex items-center justify-start"
                target="_blank"
                :href="item.url"
                rel="noopener noreferrer"
              >
                <img :src="item.logo_footer_url" class="max-w-[36px] object-cover" />
                <div class="ml-[10px]">
                  <h4 class="footer-text !text-[13rem]">{{ item.title }}</h4>
                  <p
                    class="not-italic font-medium text-[14rem] leading-[135%] text-[#677B9E] mt-[2px]"
                  >
                    {{ item.description }}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-[#E0E5EC] py-[19px]">
        <div class="container">
          <div class="grid-cols-12 flex md:flex-col md:text-center items-center justify-between">
            <h5
              class="not-italic font-medium text-[13rem] md:text-[9px] leading-[16px] md:leading-3 text-[#677B9E]"
            >
              {{ $t("univercity_footer", { year: new Date().getFullYear() }) }}
            </h5>

            <div class="flex items-center md:mt-[12px]">
              <h6
                class="not-italic font-normal text-[13rem] md:text-[9px] md:leading-3 leading-[16px] text-[#677B9E] mr-[8px]"
              >
                {{ $t("developed_by_uic") }}
              </h6>
              <a
                href="https://uic.group"
                target="_blank"
                class="bottom-footer__logo"
                rel="noopener noreferrer"
              >
                <img src="@/static/img/footer-logo.svg" alt="footer-logo" />
                <svg
                  width="91"
                  height="21"
                  viewBox="0 0 91 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M47.8634 16.1741C46.4974 16.3996 45.1145 16.5041 43.7305 16.4867C41.1347 16.4867 38.3511 14.7773 38.3511 10.0045V7.21105C38.3511 2.15027 41.2692 0.710917 43.9145 0.710917C45.2366 0.699117 46.5573 0.7966 47.8634 1.00234C48.0474 1.02368 48.2175 1.10542 48.2175 1.3151V2.35638C48.2175 2.50209 48.136 2.56609 47.9482 2.56609H47.8668C46.6413 2.463 45.6854 2.42035 43.918 2.42035C41.988 2.42035 40.2421 3.46166 40.2421 7.21105V10.0045C40.2421 13.4448 41.8005 14.7988 43.7339 14.7988C44.9984 14.7988 45.8588 14.717 46.3474 14.6742V8.71438C46.3431 8.66178 46.3494 8.60881 46.3664 8.55878C46.383 8.50876 46.4099 8.46267 46.4449 8.42342C46.4802 8.38413 46.5229 8.35248 46.5708 8.33042C46.6187 8.30833 46.6703 8.29628 46.7228 8.29502H47.8456C47.9522 8.30051 48.0529 8.34722 48.126 8.42539C48.1994 8.50353 48.2395 8.6071 48.2387 8.71438V15.7156C48.2418 15.8247 48.2054 15.9313 48.1366 16.0156C48.0675 16.0999 47.9703 16.1561 47.8634 16.1741Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M55.9801 6.33666C55.0132 6.29817 54.0452 6.36851 53.0939 6.54633V15.9252C53.099 16.0269 53.0652 16.1266 52.9992 16.2037C52.9333 16.2811 52.8407 16.3303 52.7397 16.3409H51.6596C51.555 16.3354 51.4569 16.2886 51.3864 16.2109C51.3161 16.1329 51.2794 16.0303 51.2843 15.9252V5.79644C51.2903 5.69179 51.3279 5.59142 51.3915 5.50839C51.4555 5.42537 51.5426 5.36351 51.6419 5.33089C52.8246 4.80847 54.2591 4.74805 55.9801 4.74805C56.2527 4.74805 56.4193 4.76936 56.4193 5.06078V6.01681C56.4193 6.2336 56.3769 6.33666 55.9801 6.33666Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M62.8716 16.4866C59.8191 16.4866 58.2679 14.4647 58.2679 11.4011V9.81601C58.2679 6.75254 59.826 4.73389 62.8716 4.73389C65.9172 4.73389 67.4756 6.75254 67.4756 9.81601V11.4011C67.4756 14.4647 65.9066 16.4866 62.8716 16.4866ZM65.6764 9.81601C65.6764 7.68365 64.8231 6.33672 62.8716 6.33672C60.9204 6.33672 60.088 7.67299 60.088 9.81601V11.4011C60.088 13.5333 60.9204 14.8838 62.8716 14.8838C64.8231 14.8838 65.6764 13.5476 65.6764 11.4011V9.81601Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M74.4024 16.4864H74.2043C72.7875 16.4864 69.9263 15.6939 69.9263 11.5892V5.29521C69.9217 5.24218 69.9283 5.18881 69.9455 5.1385C69.9627 5.08816 69.9902 5.04199 70.0263 5.00288C70.0622 4.96379 70.1058 4.93262 70.1545 4.91137C70.2033 4.89011 70.2557 4.87923 70.3085 4.8794H71.3889C71.4411 4.8802 71.493 4.8918 71.5406 4.91348C71.5885 4.93517 71.6312 4.96648 71.6664 5.00548C71.7017 5.04448 71.7284 5.09033 71.7453 5.14016C71.7622 5.19001 71.7685 5.24278 71.7642 5.29521V11.5892C71.7642 14.0771 72.8266 14.8836 74.2149 14.8836H74.4024C75.7908 14.8836 76.8531 14.0911 76.8531 11.5892V5.29521C76.8488 5.24307 76.8551 5.19059 76.8717 5.14099C76.8884 5.09139 76.9147 5.04571 76.9497 5.00676C76.9844 4.96782 77.0268 4.93642 77.0742 4.91454C77.1215 4.89262 77.1728 4.88068 77.225 4.8794H78.3051C78.3575 4.8802 78.4092 4.8918 78.457 4.91348C78.5046 4.93517 78.5476 4.96648 78.5829 5.00548C78.6179 5.04448 78.6448 5.09033 78.6618 5.14016C78.6784 5.19001 78.685 5.24278 78.6804 5.29521V11.5892C78.6804 15.6939 75.812 16.4864 74.4024 16.4864Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M85.7597 16.4868C84.9451 16.4759 84.1328 16.3999 83.3303 16.2593V20.0301C83.3303 20.0821 83.3202 20.1332 83.3004 20.1812C83.2807 20.2289 83.2517 20.2724 83.2153 20.3092C83.1786 20.3458 83.1353 20.3749 83.0877 20.3946C83.0398 20.4143 82.9888 20.4246 82.9372 20.4246H81.8748C81.8241 20.4241 81.7739 20.4135 81.7275 20.3935C81.681 20.3732 81.6392 20.3438 81.6042 20.3069C81.5689 20.2703 81.5417 20.2266 81.5239 20.1792C81.5058 20.1318 81.4975 20.0809 81.4995 20.0301V5.68647C81.4995 5.41639 81.5632 5.29199 81.9351 5.21025C83.1866 4.90572 84.4686 4.74478 85.7563 4.73047C88.8512 4.73047 90.2857 6.74909 90.2857 9.87656V11.3728C90.2892 14.6531 88.791 16.4868 85.7597 16.4868ZM88.4581 9.88011C88.4581 7.69089 87.8173 6.27642 85.7597 6.27642C84.9457 6.28116 84.1334 6.35007 83.3303 6.48256V14.7348C84.1337 14.8671 84.9457 14.9374 85.7597 14.9445C87.7961 14.9445 88.4581 13.6117 88.4581 11.3905V9.88011Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M11.7163 16.3161C10.7813 16.4619 8.17466 16.6467 7.27175 16.6467C3.263 16.6467 0.543091 15.6373 0.543091 10.5838V1.37196C0.543951 1.31859 0.555423 1.26596 0.576928 1.21711C0.598433 1.16828 0.629109 1.1242 0.667817 1.08748C0.706239 1.05074 0.75183 1.02209 0.801434 1.0032C0.851324 0.984315 0.904371 0.975573 0.957416 0.977459H4.3431C4.39615 0.975087 4.44948 0.983487 4.49937 1.0022C4.54926 1.02091 4.59514 1.04951 4.63385 1.08634C4.67227 1.12317 4.70324 1.16745 4.72446 1.21651C4.74567 1.26559 4.75685 1.31845 4.75743 1.37196V10.5838C4.75743 12.4602 5.38078 13.0715 6.85743 13.0715C7.52407 13.0694 8.18986 13.0266 8.85134 12.9436V1.37196C8.85163 1.31845 8.86281 1.26559 8.88403 1.21651C8.90524 1.16745 8.93621 1.12317 8.97492 1.08634C9.01363 1.04951 9.05922 1.02091 9.10911 1.0022C9.159 0.983487 9.21233 0.975087 9.26566 0.977459H12.6298C12.7397 0.972602 12.8466 1.01129 12.9283 1.08508C13.0098 1.15891 13.0591 1.26196 13.0654 1.37196V14.7099C13.0654 15.8756 12.7113 16.1704 11.7163 16.3161Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M19.5853 16.4618H16.1784C16.0694 16.4592 15.9659 16.4138 15.8896 16.3353C15.8137 16.257 15.7709 16.1518 15.7709 16.0427V1.37193C15.7721 1.31918 15.7833 1.26716 15.8042 1.21879C15.8251 1.17042 15.8555 1.12665 15.8934 1.09002C15.9312 1.05339 15.9757 1.02459 16.0247 1.00528C16.0734 0.985966 16.1259 0.976509 16.1784 0.977451H19.5853C19.6383 0.975051 19.6917 0.983452 19.7415 1.00217C19.7914 1.02088 19.8373 1.04951 19.8757 1.08633C19.9144 1.12313 19.9454 1.16742 19.9666 1.2165C19.9878 1.26556 19.999 1.31844 19.9996 1.37193V16.0427C19.9999 16.0975 19.9896 16.1518 19.9689 16.2027C19.9483 16.2535 19.9179 16.2998 19.8795 16.339C19.8407 16.3778 19.7952 16.4087 19.7444 16.4298C19.6939 16.451 19.6398 16.4618 19.5853 16.4618Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M31.6294 16.2734C30.6846 16.5436 29.7043 16.6696 28.7219 16.6465C24.9007 16.6465 22.3262 14.564 22.3262 9.79103V7.65867C22.3262 2.8715 24.9007 0.78891 28.7219 0.78891C29.7043 0.76774 30.684 0.893507 31.6294 1.16207C31.9623 1.26869 32.0864 1.32909 32.0864 1.62054V4.28954C32.0864 4.55962 31.9623 4.68402 31.7323 4.68402H31.6684C30.7032 4.57085 29.7327 4.50917 28.7609 4.49922C27.6384 4.49922 26.636 4.99678 26.636 7.64444V9.7768C26.636 12.4031 27.6347 12.9256 28.7609 12.9256C29.7327 12.9146 30.7032 12.8518 31.6684 12.7372H31.7074C31.9554 12.7372 32.0615 12.8616 32.0615 13.1317V15.8148C32.0864 16.0851 31.9623 16.1702 31.6294 16.2734Z"
                    fill="#1A2F53"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- for mobile -->

    <div class="bg-[#F5F6FA] hidden -768:block">
      <div class="footer mt-[20px] py-[12px] relative">
        <div class="flex items-center">
          <div class="container">
            <div class="grid grid-cols-4 gap-[20px]">
              <div class="col-span-1">
                <img
                  class="cursor-pointer translate-y-[-32px]"
                  src="@/static/img/footer-logo_white.png"
                  alt="footer-logo"
                  @click="toTop()"
                />
              </div>
              <div class="col-span-3">
                <div class="flex items-center group">
                  <icon
                    class="duration-200 group-hover:translate-x-[-2px] min-w-[20px]"
                    name="gray_phone"
                  />
                  <a :href="`tel:${footerItems.phone}`" class="footer-text ml-[8px]">{{
                    footerItems.phone
                  }}</a>
                </div>
                <div class="flex items-center mt-[12px] group">
                  <icon
                    class="duration-200 group-hover:translate-x-[-2px] min-w-[20px]"
                    name="gray_mail"
                  />
                  <a
                    :href="`mailto:${footerItems.email}`"
                    rel="noopener noreferrer"
                    class="footer-text ml-[8px]"
                    >{{ footerItems.email }}</a
                  >
                </div>
                <div class="flex items-center mt-[12px] group">
                  <icon
                    class="duration-200 group-hover:translate-x-[-2px] min-w-[20px]"
                    name="gray_location"
                  />
                  <a
                    :href="`${footerItems.address}`"
                    rel="noopener noreferrer"
                    target="_blank"
                    class="footer-text ml-[8px]"
                    >{{ footerItems.address }}</a
                  >
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 -476:grid-cols-1 mt-[32px] -476:mt-[18px] gap-[20px]">
              <div class="col-span-1 flex flex-col gap-[10px]">
                <router-link
                  v-for="(item, index) in footerItems?.menu"
                  :key="index"
                  class="not-italic font-medium text-[14rem] leading-[135%] text-[#677B9E]"
                  :to="item.url"
                  >{{ item.title }}</router-link
                >
              </div>
            </div>

            <div class="mt-[32px] -476:mt-[18px]">
              <div
                v-for="(item, index) in footerItems.sponsors"
                :key="index"
                class="flex items-center w-1/3 lg:w-1/2 md:w-full py-[10px] justify-start"
              >
                <a
                  class="flex items-center justify-center"
                  :href="item.url"
                  rel="noopener noreferrer"
                >
                  <div class="w-[40px] h-[40px] grid place-items-center">
                    <img :src="item.logo_footer_url" class="object-cover w-full" />
                  </div>
                  <div class="ml-[12px] -476:ml-0">
                    <h4 class="text-[#677B9E] font-medium text-[16rem] leading-[135%]">
                      {{ item.title }}
                    </h4>
                    <p class="not-italic font-normal text-[11px] leading-[135%] text-[#A3AEC5]">
                      {{ item.description }}
                    </p>
                  </div>
                </a>
              </div>
            </div>
            <div class="flex gap-[8px] mt-[0px]">
              <a
                v-for="(socialLinks, index) in footerSocial"
                :key="index"
                :href="`https://${socialLinks.url}`"
                :title="socialLinks.title"
                target="_blank"
                class="w-[24px] h-[24px]"
              >
                <el-tooltip
                  v-if="socialLinks.title === 'Linkedin'"
                  class="tooltip-copy"
                  placement="top"
                  trigger="hover"
                  :content="$t('Linkedin')"
                >
                  <svg
                    v-if="socialLinks.title === 'Linkedin'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23 1H1V23H23V1ZM9.15742 7.15255C9.15742 6.46689 8.64317 5.95264 7.87133 5.95264C7.01425 5.95264 6.5 6.46689 6.5 7.15255C6.5 7.83822 7.01425 8.35339 7.78608 8.35247C8.64317 8.35247 9.15742 7.83822 9.15742 7.15255ZM6.5 16.5832H9.25V9.24989H6.5V16.5832ZM15.828 16.5832H18.4167V12.5756C18.4167 10.2729 17.3818 9.24989 16.0874 9.24989C14.7931 9.24989 14.1028 9.67614 13.7582 10.2729V9.24989H11.0833V16.5832H13.7572V12.5756C13.7572 11.3821 14.6208 11.2116 14.8793 11.2116C15.1378 11.2116 15.828 11.4673 15.828 12.5756V16.5832Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
                <el-tooltip
                  v-if="socialLinks.title === 'Facebook'"
                  class="tooltip-copy"
                  placement="top"
                  trigger="hover"
                  :content="$t('Facebook')"
                >
                  <svg
                    v-if="socialLinks.title === 'Facebook'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23 1H1V23H23V1ZM10.2813 23V15.2661H7.48694V12.0669H10.2813V9.62864C10.2813 6.85521 11.9224 5.32324 14.436 5.32324C15.6398 5.32324 16.8986 5.53923 16.8986 5.53923V8.26134H15.5112C14.145 8.26134 13.7188 9.11456 13.7188 9.98965V12.0669H16.7695L16.2816 15.2661H13.7188V23H10.2813Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
                <el-tooltip
                  v-if="socialLinks.title === 'Instagram'"
                  class="tooltip-copy"
                  placement="top"
                  trigger="hover"
                  :content="$t('Instagram')"
                >
                  <svg
                    v-if="socialLinks.title === 'Instagram'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 8.33325C11.0276 8.33325 10.0949 8.71956 9.40732 9.40719C8.71968 10.0948 8.33337 11.0275 8.33337 11.9999C8.33337 12.9724 8.71968 13.905 9.40732 14.5926C10.0949 15.2803 11.0276 15.6666 12 15.6666C12.9725 15.6666 13.9051 15.2803 14.5928 14.5926C15.2804 13.905 15.6667 12.9724 15.6667 11.9999C15.6667 11.0275 15.2804 10.0948 14.5928 9.40719C13.9051 8.71956 12.9725 8.33325 12 8.33325Z"
                      fill="#2B5E9B"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23 1H1V23H23V1ZM18.0047 7.15211C18.5689 7.15211 19.0263 6.69472 19.0263 6.1305C19.0263 5.56628 18.5689 5.10889 18.0047 5.10889C17.4405 5.10889 16.9831 5.56628 16.9831 6.1305C16.9831 6.69472 17.4405 7.15211 18.0047 7.15211ZM5.88892 12C5.88892 15.3746 8.62547 18.1111 12 18.1111C15.3746 18.1111 18.1111 15.3746 18.1111 12C18.1111 8.62544 15.3746 5.88889 12 5.88889C8.62547 5.88889 5.88892 8.62544 5.88892 12Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
                <el-tooltip
                  v-if="socialLinks.title === 'Telegram'"
                  class="tooltip-copy"
                  placement="top"
                  trigger="hover"
                  :content="$t('Telegram')"
                >
                  <svg
                    v-if="socialLinks.title === 'Telegram'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23 1H1V23H23V1ZM15.9905 17.9396C16.0704 17.8631 16.133 17.7704 16.1742 17.6678L18.2735 6.94665C18.2735 6.23162 17.3044 6.66339 17.3044 6.66339L5.51573 11.3466C5.51573 11.3466 4.95749 11.5402 5.00259 11.8966C5.04549 12.2558 5.50089 12.4191 5.50089 12.4191L8.46593 13.4289L15.5857 8.84851C15.5857 8.84851 15.996 8.59492 15.9834 8.84851C15.9834 8.84851 16.0565 8.8936 15.8349 9.1015C15.616 9.30994 10.2425 14.2022 10.2425 14.2022L10.235 14.2671L10.2232 14.2578L9.8558 17.5451C9.90746 17.5648 9.96324 17.5712 10.018 17.5637C10.0728 17.5562 10.1248 17.5351 10.1693 17.5022L12.0859 15.7341L15.072 18.0544C15.1683 18.1089 15.2751 18.1421 15.3853 18.1519C15.4954 18.1617 15.6064 18.1478 15.7108 18.1112C15.8152 18.0746 15.9105 18.016 15.9905 17.9396Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
                <el-tooltip
                  v-if="socialLinks.title === 'Youtube'"
                  class="tooltip-copy"
                  trigger="hover"
                  placement="top"
                  :content="$t('Youtube')"
                >
                  <svg
                    v-if="socialLinks.title === 'Youtube'"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1 1H23V23H1V1ZM8.41919 7.271L8.42024 16.729L17.4502 12.0163L8.41919 7.271Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
                <el-tooltip
                  v-if="socialLinks.title === 'Twitter'"
                  class="tooltip-copy"
                  placement="top"
                  trigger="hover"
                  :content="$t('Twitter')"
                >
                  <svg
                    v-if="socialLinks.title === 'Twitter'"
                    width="24"
                    height="24"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22 0H0V22H22V0ZM9.36498 11.6616L3.70236 4.58333H8.06667L11.779 9.22375L16.3734 4.58333H17.656L12.352 9.94028L18.3333 17.4167H13.969L9.93821 12.3779L4.94923 17.4167H3.66667L9.36498 11.6616Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
                <el-tooltip
                  v-if="socialLinks.title === 'Tiktok'"
                  placement="top"
                  class="tooltip-copy"
                  trigger="hover"
                  :content="$t('Tiktok')"
                >
                  <svg
                    v-if="socialLinks.title === 'Tiktok'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1 1H23V23H1V1ZM18.5977 10.4933C18.7336 10.4933 18.8677 10.4853 19 10.4733V7.81102C16.8871 7.66279 15.197 6.04717 14.9766 4H12.6352C12.6352 4 12.6107 15.1161 12.6107 15.1702C12.6107 16.5407 11.373 17.6205 9.97139 17.6205C8.56982 17.6205 7.4341 16.5099 7.4341 15.1395C7.4341 13.769 8.56982 12.6584 9.97139 12.6584C10.0494 12.6584 10.1249 12.6685 10.2004 12.6786C10.2264 12.6821 10.2525 12.6856 10.2786 12.6887V10.2932C10.2544 10.2917 10.2302 10.29 10.206 10.2884C10.1283 10.2831 10.0505 10.2778 9.97139 10.2778C7.22596 10.2778 5 12.4544 5 15.1389C5 17.8234 7.22596 20 9.97139 20C12.7168 20 14.9428 17.8234 14.9428 15.1389V8.56182C15.7246 9.72422 17.0685 10.4933 18.5977 10.4933Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
                <el-tooltip
                  v-if="socialLinks.title === 'Vkontakte'"
                  placement="top"
                  class="tooltip-copy"
                  trigger="hover"
                  :content="$t('Vkontakte')"
                >
                  <svg
                    v-if="socialLinks.title === 'Vkontakte'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23 1H1V23H23V1ZM19.8447 15.6892C19.7724 15.5562 19.4588 14.9791 18.2685 13.8732C17.7035 13.3487 17.4086 13.0813 17.3775 12.7861C17.335 12.3815 17.7885 11.9248 18.7219 10.6819C19.7051 9.3716 20.098 8.57155 19.9753 8.22931C19.8589 7.90307 19.1361 7.9893 19.1361 7.9893L16.7298 8.00441C16.7298 8.00441 16.5511 7.98041 16.4186 8.05952C16.2897 8.13686 16.2062 8.31732 16.2062 8.31732C16.2062 8.31732 15.8257 9.33071 15.3172 10.193C14.2469 12.0118 13.8185 12.1078 13.6425 11.9949C13.3006 11.7737 13.3169 11.1805 13.3312 10.662C13.334 10.5616 13.3367 10.4641 13.3367 10.3726C13.3367 9.96698 13.3508 9.6158 13.363 9.31314C13.4039 8.30034 13.4228 7.83085 12.8157 7.68439C12.5553 7.62038 12.3624 7.57949 11.6939 7.57238C10.8343 7.56349 10.108 7.57505 9.69644 7.77595C9.42265 7.91018 9.21197 8.20886 9.34086 8.22575C9.49998 8.2462 9.86001 8.32265 10.0502 8.58133C10.2974 8.91646 10.2885 9.67029 10.2885 9.67029C10.2885 9.67029 10.4307 11.7451 9.9569 12.0029C9.63333 12.1798 9.18885 11.8189 8.23324 10.169C7.74432 9.3236 7.37452 8.38843 7.37452 8.38843C7.37452 8.38843 7.3034 8.21331 7.17628 8.11997C7.02161 8.00707 6.80648 7.96974 6.80648 7.96974L4.52101 7.9813C4.52101 7.9813 4.17788 7.98485 4.05165 8.13419C3.93964 8.26754 4.04276 8.52977 4.04276 8.52977C4.04276 8.52977 5.8322 12.6936 7.85899 14.8048C9.71778 16.7392 11.8281 16.5649 11.8281 16.5649H12.7846C12.7846 16.5649 13.0735 16.5809 13.2211 16.4227C13.3562 16.276 13.3518 16.0494 13.3518 16.0494C13.3518 16.0494 13.3331 14.7657 13.9287 14.5773C14.2832 14.4645 14.6988 14.9408 15.1485 15.4563C15.443 15.7939 15.7521 16.1482 16.0684 16.3649C16.672 16.781 17.1325 16.6903 17.1325 16.6903L19.2695 16.6601C19.2695 16.6601 20.3878 16.5907 19.8571 15.7116C19.8541 15.7065 19.8501 15.6991 19.8447 15.6892Z"
                      fill="#2B5E9B"
                    />
                  </svg>
                </el-tooltip>
              </a>
            </div>
            <div class="flex items-center md:justify-center mt-[32px] -476:mt-[18px]">
              <a
                v-for="(item, index) in footerItems.links"
                :key="index"
                class="duration-200 hover:translate-y-[-3px] md:mx-[6px] mx-[8px]"
                :href="item.url"
                rel="noopener noreferrer"
              >
                <img :src="item.logo_url" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-[#E0E5EC] py-[20px]">
        <div class="container">
          <div class="grid-cols-12 flex md:flex-col md:text-center items-center justify-between">
            <h5
              class="not-italic font-medium text-[13rem] md:text-[9px] leading-[16px] text-[#677B9E] duration-200"
            >
              {{ $t("univercity_footer", { year: new Date().getFullYear() }) }}
            </h5>

            <div class="flex items-center justify-start md:mt-[12px]">
              <h6
                class="not-italic font-normal text-[13rem] md:text-[9px] md:leading-3 leading-[16px] text-[#677B9E] mr-[8px] cursor-pointer duration-200 hover:text-[#1A1F2A]"
              >
                {{ $t("developed_by_uic") }}
              </h6>

              <a
                class="uic mb-[-5px] flex items-center justify-center"
                href="https://uic.group/uz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  class="uicLogo"
                  width="42"
                  height="22"
                  viewBox="0 0 42 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6178 5.26825C8.03155 3.92711 4.12766 7.11414 1.72637 3.53053C1.71918 3.5161 1.712 3.50889 1.70481 3.49447C1.64011 3.39353 1.72637 3.24932 1.8414 3.27815C6.78777 4.46067 7.593 3.72521 9.67076 3.97757C11.5903 4.20831 13.6178 5.26825 13.6178 5.26825Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M14.6022 6.17028C9.68451 5.44203 6.19761 9.12658 3.56625 6.29287C3.55906 6.28566 3.55188 6.27124 3.5375 6.26403C3.46561 6.18472 3.51593 6.04051 3.62377 6.04772C8.11721 6.37939 9.17406 5.58624 11.0218 5.50693C12.7472 5.43482 14.6022 6.17028 14.6022 6.17028Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M15.5157 7.3306C11.2235 6.74656 9.38308 10.6114 5.90336 8.24634C5.89617 8.23913 5.88898 8.23192 5.87461 8.2175C5.80272 8.15261 5.82428 7.96512 5.92493 7.96512C9.72817 7.97235 10.7203 7.08545 12.3237 6.89078C14.4949 6.63119 15.5157 7.3306 15.5157 7.3306Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M17.4496 8.60747C15.2064 8.84541 15.5588 10.648 13.1 10.2442C12.7765 10.1938 12.8484 9.96303 12.9922 9.91978C15.0556 9.32851 15.0556 8.93193 15.7961 8.6363C16.5007 8.36952 17.4496 8.60747 17.4496 8.60747Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M16.4358 8.05237C13.2005 8.11724 12.3738 10.4462 9.64894 9.68914C9.23194 9.57376 9.37574 9.2565 9.59862 9.22767C12.7189 8.73014 12.8698 8.26866 14.0273 7.99468C15.1129 7.73511 16.4358 8.05237 16.4358 8.05237Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M14.5879 5.26152C14.5663 5.29757 14.516 5.30478 14.4801 5.29036C13.8115 4.9082 13.1861 4.46115 12.4672 3.97084C11.7913 3.51658 10.339 2.89648 7.3194 3.04069C5.8815 3.1128 3.6959 3.40843 1.4384 1.85818C0.891995 1.49044 0.338401 0.863126 0.0508214 0.279088C0.0220654 0.228608 0.00768759 0.16371 0.00049858 0.0988124C-0.00669043 0.0339149 0.0651992 -0.0165456 0.12992 0.00508037C5.71615 2.25475 7.31221 1.37508 10.8279 2.18985C12.2729 2.52876 14.0631 4.63421 14.5809 5.16056C14.6095 5.18221 14.6095 5.22546 14.5879 5.26152Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M19.4483 17.5915C19.3834 17.7932 19.3978 18.0313 19.2685 18.2043C19.1102 18.4351 18.7221 18.4567 18.5351 18.2475C18.4129 18.1395 18.4129 17.9665 18.3697 17.8294C18.0894 16.5964 17.8162 15.3633 17.543 14.1231C17.5143 14.0367 17.543 13.9789 17.6292 13.943C17.7659 13.9068 17.7803 14.0583 17.8233 14.1449C18.1324 14.9885 18.42 15.8392 18.7364 16.6829C18.837 16.9714 19.175 16.8775 19.3978 16.9498C19.6351 17.101 19.4913 17.3823 19.4483 17.5915Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M19.815 14.1885C19.8439 14.2678 19.8007 14.3615 19.7145 14.3759C19.6642 14.3831 19.621 14.3759 19.6066 14.3038C19.398 13.8856 19.2183 13.4458 19.0026 13.0276C18.7223 12.7896 18.4275 12.5445 18.2551 12.2056C17.9459 11.6576 17.9746 10.9438 18.3197 10.4174C18.3484 10.3813 18.37 10.3381 18.3988 10.302C18.4491 10.2299 18.557 10.2443 18.5856 10.3309C18.6072 10.3958 18.6216 10.4607 18.6505 10.5183C19.0386 11.7369 19.4126 12.9699 19.815 14.1885Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M19.8727 8.38411C19.8584 8.70858 19.7362 9.01142 19.6571 9.32147C19.6498 9.3431 19.6427 9.35751 19.6211 9.36472C19.5708 9.38637 19.5206 9.3503 19.5206 9.29984C19.5276 8.87442 19.6787 8.45622 19.5708 8.038C19.4127 7.46837 19.0244 6.97086 18.9957 6.36518C18.9812 6.04792 19.0603 5.73787 19.1252 5.42782C18.895 4.94472 18.7871 4.38949 18.9093 3.86314C18.9309 3.79825 18.9382 3.79825 18.9741 3.84873C19.1971 4.1732 19.4917 4.49766 19.4917 4.92307C19.463 5.52876 19.1322 6.13444 19.3552 6.74012C19.5349 7.28091 19.923 7.78563 19.8727 8.38411Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M21.7707 6.29278C21.7564 7.08593 21.0662 7.72045 21.1453 8.52803C21.1453 8.83808 21.2243 9.15534 21.1884 9.46539C21.1381 9.73938 20.8289 9.78265 20.6062 9.84755C20.4767 9.90524 20.3329 9.75382 20.3689 9.62402C20.3689 8.68666 20.3689 7.74209 20.3689 6.80473C20.3832 6.41537 20.4767 6.00435 20.7427 5.70874C20.9081 5.51405 21.0805 5.31937 21.2602 5.12468C21.2962 5.08141 21.3178 5.03095 21.3107 4.98047C21.2962 4.80742 21.2602 4.656 21.3394 4.4541C21.4616 4.20174 21.6199 4.05032 21.7851 3.88448C21.814 3.85565 21.857 3.87006 21.8642 3.90611C21.9793 4.41806 21.8642 4.97326 21.627 5.43473C21.6845 5.70874 21.7707 5.99715 21.7707 6.29278Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M30.851 3.39391C29.8732 3.6679 29.4203 3.9996 29.0322 4.30965C29.0322 4.30965 29.9164 3.9996 31.1889 3.86259C34.7981 3.46602 35.0065 4.81437 39.0471 3.2497C39.1836 3.22807 39.2195 3.33622 39.1836 3.39391C38.6444 4.33127 38.0477 5.36957 35.7902 5.46331C33.3314 5.56427 32.0517 4.57642 29.7438 4.87206C28.27 5.05952 27.5079 5.52099 27.0837 5.80221C32.1164 4.836 31.6994 7.05683 36.6313 5.87432C36.6888 5.85988 36.7537 5.84546 36.8112 5.85267C36.9405 5.86711 36.9909 6.02574 36.9118 6.11226C36.8758 6.15551 36.8256 6.19878 36.7896 6.24204C36.1426 6.94145 35.4594 7.70577 33.1588 7.53272C30.4556 7.33082 30.2832 5.65079 25.121 6.93424C30.1249 6.91262 30.0386 8.5566 33.806 8.0663C33.9354 8.05188 34.0144 8.21051 33.9138 8.29703C33.8563 8.34749 33.7914 8.39076 33.7412 8.43404C33.1733 8.88107 32.3464 9.42907 30.7935 9.11181C27.5582 8.43404 27.9681 7.09287 23.8054 7.82835C27.0477 7.91488 26.825 9.1767 30.1537 9.48676C30.1537 9.48676 30.1537 9.48676 30.1608 9.48676C30.3405 9.50838 30.391 9.74634 30.24 9.84729C30.1248 9.9266 29.9954 9.98429 29.8732 10.0347C27.4433 10.9793 26.3145 7.92208 23.3308 8.60708C25.4661 8.79455 25.2935 9.51561 27.2204 10.042C27.4288 10.0996 27.4074 10.3809 27.1772 10.4025C24.891 10.6332 25.0923 9.09018 23.6903 9.03249C23.3165 9.01807 22.9714 9.21998 22.7844 9.55165C22.2309 10.5178 22.4536 11.4336 22.4177 11.9311C22.5471 12.4503 22.7414 12.9551 22.7485 13.5029C22.7557 13.8851 22.7198 14.2817 22.5974 14.6494C22.3674 15.4137 22.1374 16.1782 21.9001 16.9497C21.8498 17.1082 21.8569 17.2813 21.9144 17.4327C22.0007 17.6635 22.0871 17.887 22.1231 18.1321C22.2093 18.5431 22.1517 18.9685 22.0079 19.3651C21.706 20.1078 21.4039 20.8504 21.1021 21.6004C21.0445 21.7373 21.0015 21.8816 20.9007 21.9969C20.7499 22.0258 20.7642 21.8311 20.7785 21.7373C21.0734 18.9612 21.3537 16.1852 21.6412 13.4092L21.8714 12.7459C21.4185 13.1352 21.2172 13.6761 20.9223 14.1591C20.8864 14.2744 20.7139 14.2962 20.678 14.1664C20.7067 13.6832 20.7713 13.2002 20.7858 12.717C20.8288 12.2267 20.8218 11.7292 20.9871 11.2605C21.1739 10.7846 21.5334 10.4025 21.8139 9.9915C22.2739 9.40023 22.619 8.72965 22.8563 8.02303C23.0001 7.59041 23.3022 7.20825 23.6903 6.97031C25.0348 6.11947 25.8183 5.38399 27.0909 4.4178C28.2628 3.5309 29.1687 2.83871 29.6864 2.6296C32.0517 1.65617 36.804 2.7017 40.8732 0.0482517C40.9738 -0.00943721 41.1032 0.105921 41.0243 0.271779C40.6432 1.23797 40.1903 1.85808 39.1117 2.39165C36.0059 3.92749 32.4399 2.94686 30.851 3.39391Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M21.4183 5.05993C21.4183 5.05993 21.1521 4.59125 20.5051 4.53356C20.0162 4.49031 19.7935 4.65615 19.7935 4.65615C19.7935 4.65615 20.3829 4.4831 20.8431 4.89409C21.3031 5.30509 21.0515 5.65841 21.0515 5.65841C21.0515 5.65841 21.5548 5.36278 21.4183 5.05993Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M21.3892 4.99581C21.3892 4.99581 21.0513 4.6353 20.3611 4.60645C20.3611 4.60645 20.7708 4.70741 20.8213 4.93091C20.9075 5.35634 20.5337 5.92596 20.4618 6.19997C20.4043 6.44512 21.3892 4.99581 21.3892 4.99581Z"
                    fill="#1A2F53"
                  />
                </svg>

                <svg
                  class="uicName"
                  width="63"
                  height="15"
                  viewBox="0 0 63 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.1115 11.5573C32.1757 11.7123 31.2284 11.7842 30.2803 11.7722C28.5021 11.7722 26.5952 10.597 26.5952 7.3157V5.39525C26.5952 1.91599 28.5942 0.926438 30.4064 0.926438C31.3121 0.918326 32.2168 0.985345 33.1115 1.12679C33.2376 1.14144 33.3541 1.19766 33.3541 1.34181V2.05769C33.3541 2.15786 33.2983 2.20184 33.1696 2.20184H33.1138C32.2743 2.13099 31.6195 2.10166 30.4087 2.10166C29.0866 2.10166 27.8906 2.81756 27.8906 5.39525V7.3157C27.8906 9.68073 28.9582 10.6118 30.2826 10.6118C31.1488 10.6118 31.7383 10.5556 32.073 10.5261V6.42878C32.0701 6.3926 32.0744 6.3562 32.086 6.32181C32.0974 6.28742 32.1158 6.25573 32.1398 6.22875C32.164 6.20174 32.1932 6.17997 32.226 6.16479C32.2588 6.14963 32.2942 6.14134 32.3301 6.14047H33.0993C33.1724 6.14424 33.2413 6.17636 33.2914 6.23008C33.3417 6.28382 33.3692 6.35501 33.3686 6.42878V11.2421C33.3708 11.3171 33.3458 11.3904 33.2987 11.4483C33.2513 11.5063 33.1848 11.545 33.1115 11.5573Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M38.6719 4.79431C38.0096 4.76785 37.3465 4.81621 36.6947 4.93846V11.3864C36.6983 11.4563 36.6751 11.5248 36.6299 11.5779C36.5847 11.6311 36.5213 11.6649 36.4522 11.6721H35.7122C35.6405 11.6684 35.5734 11.6362 35.5251 11.5828C35.4769 11.5292 35.4518 11.4586 35.4551 11.3864V4.42292C35.4593 4.35097 35.485 4.28196 35.5286 4.22488C35.5724 4.1678 35.6321 4.12528 35.7001 4.10285C36.5103 3.74369 37.493 3.70215 38.6719 3.70215C38.8587 3.70215 38.9728 3.7168 38.9728 3.91715V4.57442C38.9728 4.72346 38.9438 4.79431 38.6719 4.79431Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M43.393 11.7723C41.3019 11.7723 40.2393 10.3823 40.2393 8.27604V7.18632C40.2393 5.0802 41.3066 3.69238 43.393 3.69238C45.4794 3.69238 46.5469 5.0802 46.5469 7.18632V8.27604C46.5469 10.3823 45.4721 11.7723 43.393 11.7723ZM45.3144 7.18632C45.3144 5.72033 44.7298 4.79432 43.393 4.79432C42.0563 4.79432 41.4861 5.71301 41.4861 7.18632V8.27604C41.4861 9.74193 42.0563 10.6704 43.393 10.6704C44.7298 10.6704 45.3144 9.75176 45.3144 8.27604V7.18632Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M51.2919 11.7718H51.1562C50.1857 11.7718 48.2256 11.2269 48.2256 8.40498V4.07786C48.2224 4.04141 48.227 4.00472 48.2387 3.97013C48.2505 3.93552 48.2694 3.90378 48.2941 3.87689C48.3187 3.85002 48.3485 3.82859 48.3819 3.81397C48.4153 3.79936 48.4513 3.79188 48.4874 3.79199H49.2275C49.2633 3.79254 49.2988 3.80052 49.3314 3.81543C49.3642 3.83034 49.3935 3.85186 49.4177 3.87867C49.4418 3.90549 49.4601 3.93701 49.4717 3.97127C49.4833 4.00554 49.4876 4.04182 49.4846 4.07786V8.40498C49.4846 10.1154 50.2124 10.6699 51.1635 10.6699H51.2919C52.243 10.6699 52.9707 10.125 52.9707 8.40498V4.07786C52.9678 4.04202 52.9721 4.00593 52.9835 3.97184C52.9949 3.93774 53.0129 3.90633 53.0369 3.87956C53.0607 3.85279 53.0898 3.8312 53.1222 3.81615C53.1546 3.80109 53.1897 3.79288 53.2255 3.79199H53.9654C54.0013 3.79254 54.0367 3.80052 54.0695 3.81543C54.1021 3.83034 54.1316 3.85186 54.1557 3.87867C54.1797 3.90549 54.1982 3.93701 54.2097 3.97127C54.2211 4.00554 54.2257 4.04182 54.2225 4.07786V8.40498C54.2225 11.2269 52.2575 11.7718 51.2919 11.7718Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M59.0724 11.7728C58.5144 11.7654 57.9579 11.7131 57.4082 11.6165V14.2088C57.4082 14.2446 57.4013 14.2797 57.3877 14.3127C57.3742 14.3455 57.3543 14.3754 57.3294 14.4007C57.3043 14.4259 57.2746 14.4459 57.242 14.4595C57.2092 14.473 57.1742 14.4801 57.1389 14.4801H56.4111C56.3764 14.4797 56.342 14.4724 56.3102 14.4587C56.2784 14.4447 56.2497 14.4245 56.2257 14.3992C56.2016 14.374 56.1829 14.344 56.1707 14.3114C56.1583 14.2788 56.1526 14.2438 56.154 14.2088V4.34767C56.154 4.16198 56.1976 4.07648 56.4524 4.02028C57.3098 3.81091 58.188 3.70027 59.0701 3.69043C61.1902 3.69043 62.1729 5.07822 62.1729 7.22834V8.25698C62.1753 10.5122 61.149 11.7728 59.0724 11.7728ZM60.921 7.23078C60.921 5.72571 60.482 4.75326 59.0724 4.75326C58.5148 4.75652 57.9583 4.8039 57.4082 4.89498V10.5684C57.9585 10.6593 58.5148 10.7076 59.0724 10.7125C60.4674 10.7125 60.921 9.79624 60.921 8.2692V7.23078Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M8.3492 11.6559C7.70867 11.7561 5.92301 11.8832 5.30448 11.8832C2.55832 11.8832 0.695068 11.1892 0.695068 7.71492V1.38185C0.695658 1.34516 0.703517 1.30898 0.718248 1.27539C0.73298 1.24182 0.753994 1.21151 0.780511 1.18625C0.806831 1.16101 0.838063 1.14131 0.872044 1.12833C0.906221 1.11535 0.94256 1.10934 0.978898 1.11063H3.29823C3.33457 1.109 3.37111 1.11478 3.40529 1.12764C3.43946 1.14051 3.47089 1.16017 3.49741 1.18549C3.52373 1.21081 3.54494 1.24125 3.55948 1.27498C3.57401 1.30872 3.58167 1.34506 3.58206 1.38185V7.71492C3.58206 9.00499 4.00908 9.42523 5.02065 9.42523C5.47733 9.42376 5.93342 9.39438 6.38657 9.33728V1.38185C6.38676 1.34506 6.39442 1.30872 6.40896 1.27498C6.42349 1.24125 6.44471 1.21081 6.47122 1.18549C6.49774 1.16017 6.52897 1.14051 6.56315 1.12764C6.59732 1.11478 6.63386 1.109 6.67039 1.11063H8.975C9.05023 1.10729 9.1235 1.13389 9.17948 1.18462C9.23526 1.23538 9.26904 1.30623 9.27337 1.38185V10.5516C9.27337 11.353 9.03078 11.5557 8.3492 11.6559Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M13.7399 11.7551H11.4061C11.3314 11.7533 11.2605 11.7221 11.2083 11.6681C11.1562 11.6143 11.127 11.542 11.127 11.4669V1.38086C11.1277 1.3446 11.1354 1.30882 11.1497 1.27556C11.1641 1.24231 11.1849 1.21224 11.2108 1.18705C11.2368 1.16187 11.2672 1.14207 11.3008 1.1288C11.3342 1.11552 11.3701 1.109 11.4061 1.10964H13.7399C13.7763 1.10801 13.8128 1.11379 13.847 1.12665C13.8812 1.13952 13.9126 1.15918 13.9389 1.1845C13.9654 1.20982 13.9866 1.24026 14.0012 1.27399C14.0157 1.30774 14.0234 1.34407 14.0238 1.38086V11.4669C14.024 11.5047 14.0169 11.542 14.0028 11.5769C13.9886 11.6119 13.9678 11.6437 13.9415 11.6706C13.9149 11.6973 13.8837 11.7186 13.849 11.7331C13.8144 11.7476 13.7773 11.7551 13.7399 11.7551Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M21.9903 11.6256C21.3431 11.8114 20.6715 11.898 19.9986 11.8821C17.3809 11.8821 15.6172 10.4504 15.6172 7.169V5.70301C15.6172 2.41186 17.3809 0.980089 19.9986 0.980089C20.6715 0.965535 21.3427 1.052 21.9903 1.23663C22.2183 1.30994 22.3034 1.35146 22.3034 1.55181V3.38674C22.3034 3.57243 22.2183 3.65796 22.0608 3.65796H22.017C21.3558 3.58015 20.6909 3.53775 20.0253 3.53091C19.2563 3.53091 18.5696 3.87296 18.5696 5.69323V7.15922C18.5696 8.96482 19.2537 9.324 20.0253 9.324C20.6909 9.31647 21.3558 9.27324 22.017 9.1945H22.0437C22.2136 9.1945 22.2863 9.28002 22.2863 9.46571V11.3103C22.3034 11.4961 22.2183 11.5547 21.9903 11.6256Z"
                    fill="#1A2F53"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { onMounted } from "vue";

export default {
  data() {
    return {
      menuFooter: [],
      menuFooter2: [
        {
          link: "/static/social-activity-motivation",
          title: this.$t("life_of_students"),
        },
        {
          link: "/vacancy",
          title: this.$t("vacancies"),
        },
        {
          link: "/class-schedule",
          title: this.$t("class_schedule"),
        },
        {
          link: "/faculties/kafedra",
          title: this.$t("department_kafedra"),
        },
      ],
      footerContact: {
        number: "",
        mail: "",
        adress: {
          title: this.$t("addres_footer"),
          adress: "https://yandex.uz/maps/org/194913734385/?ll=69.280938%2C41.314328&z=18.07",
        },
      },
      footerSocial: [],
      footerPartner: [
        {
          link: "https://data.gov.uz",
          img: "data_gov_uz",
          title: "Ochiq ma'lumotlar portali",
          desc: "data.gov.uz",
        },
      ],
      footerItems: [],
    };
  },
  computed: {
    ...mapState({
      footer: (state) => state.footer,
    }),
  },
  async created() {
    this.pending = true;
    await Promise.allSettled([this.$store.dispatch("fetchFooter")])
      .then((res) => {
        this.footerItems = res[0].value.data;
        // this.menuFooter = this.footerItems?.menu;
        this.footerContact.mail = this.footerItems?.email ?? "";
        this.footerContact.number = this.footerItems?.phone ?? "";
        this.footerContact.adress.title = this.footerItems?.address ?? "";
        this.footerSocial = this.footerItems?.links ?? [];
        this.footerPartner = this.footerItems?.sponsors ?? [];
      })
      .finally(() => {
        this.pending = false;
      });
  },
  methods: {
    toTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss">
.footer {
  background: url("@/static/img/footer-bg.png") no-repeat right bottom;
  background-size: 180px;
  background-position-y: 150px;

  @media screen and (max-width: 768px) {
    background: url("@/static/img/footer-bg.png") no-repeat right bottom;
    background-size: 120px;
    background-position-y: 105%;
  }
}

.footer-text {
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16rem;
  line-height: 135%;
  color: #677b9e;
  transition: all 0.3s ease;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
  &:hover {
    color: #1a2f53;
  }
}

.footer-uic {
  background: #0b265c;
  color: #fff;
  padding: 16px 0;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  a {
    margin: 0 8px;
  }
  h6 {
    font-family: Cera PRO;
    font-style: normal;
    font-weight: normal;
    font-size: 16rem;
    line-height: 130%;
    text-align: right;
    font-feature-settings: "kern" off;
    color: #ffffff;
  }
}

.bottom-footer__logo {
  // margin-right: 120px;
  display: flex;
  align-items: center;
  gap: 12.5px;

  svg {
    opacity: 0;
    visibility: hidden;
    width: 0;
    transition: all 0.5s;
  }
  transition: all 0.5s;
  &:hover {
    svg {
      opacity: 1;
      visibility: visible;
      width: 90px;
      transition: all 0.5s;
    }
    transition: all 0.5s;
  }
}

// T O O L T I P S

.tooltip {
  position: relative;
  cursor: pointer;
  font-size: 11px;
  z-index: 1000;
}

.tooltip::before,
.tooltip::after {
  position: absolute;
  opacity: 1;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;
}

.tooltip:hover::before,
.tooltip:hover::after {
  opacity: 1;
  visibility: visible;
}

.tooltip::before {
  content: attr(title);
  z-index: 2;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  padding: 5px;
  display: flex;
  justify-content: center;
  width: 59px;
  bottom: 35px;
  position: absolute;
  left: -44%;
}

.tooltip::after {
  content: "";
  width: 0;
  height: 0;
}

.tooltip--top::before,
.tooltip--top::after {
  bottom: 100%;
  left: 50%;
  transform: translate(-50%);
  margin-bottom: 15px;
}

.tooltip--top::after {
  margin-bottom: 8px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 7px solid rgba(0, 0, 0, 0.7);
}

.tooltip--bottom::before,
.tooltip--bottom::after {
  top: 100%;
  left: 50%;
  transform: translate(-50%);
  margin-top: 15px;
}

.socLinks a:hover {
  path {
    fill: url(#Gradient3);
  }
}

.footer-wrapper {
  position: relative;
}
</style>

<!-- F O O T E R -->
