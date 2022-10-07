export const template = `
<div class="modal">

    <div class="modal__content-list">
        {{#each this.usersOflist}}
            
            {{{this}}}

        {{/each}}
    </div>

</div>
`;

export const templateItem = `
<div class="modal__conten-list-item">
    <div class="modal__conten-list-item-text">
        {{login}}
    </div>

    <div class="modal__conten-list-item-icon">
        {{{deleteUserFromChatIcon}}}
    </div>
</div>
`;
