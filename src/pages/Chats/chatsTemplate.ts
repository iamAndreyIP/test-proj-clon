export const template = `
<main class="chats">
      <div class="chats__menu">
        <div class="chats__menu-head">
          <a href="#" class="chats__menu-head__link"> Профиль <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg> </a>
          <input
            type="text"
            class="chats__menu-head__input search-input"
            placeholder="Поиск"
          />
        </div>
        <div class="chats__menu-list">
          {{{chatList}}}
        </div>
      </div>
      <div class="chats__content">
        <div class="chats__content-head">
          <div class="chats__content-head-info">
            <div class="chats__content-head-info__avatar">
              <img class="head-info__avatar" alt="" />
            </div>
            <div class="chats__content-head-info__title">Vadim</div>
          </div>
          <div class="chats__content-head-dote">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </div>
        </div>
        <div class="chats__content-field">
          <div class="chats__content-field-date">19 июня</div>
        </div>
        <div class="chats__content-actions">
          <div class="chats__content-actions-icon-file">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </div>
          <div class="chats__content-actions-input">
            <input
              type="text"
              placeholder="Сообщение"
              name="message"
              class="input-message"
            />
          </div>
          <div class="chats__content-actions-icon-send">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
        </svg>
          </div>
        </div>
      </div>
    </main>
`;
