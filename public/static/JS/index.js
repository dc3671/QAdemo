var app = new Vue({
    el: '#app',
    data: {
        items: [],
        question: '',
        temp_question: '',
        activeTabIndex: 3,
        algos: ['quiz', 'forum', 'synthetic', 'aibot'],
    },
    methods: {
        _generateItem(_uid, _side, _al, _message) {
            var item = {};
            item.uid = _uid;
            item.class = _side + ' ' + this.algos[_al];
            item.index = _al;
            item.message = _message;
            return item;
        },
        getAnswer: function() {
            this.temp_question = this.question;
            if (this.activeTabIndex == 3) {
                var al = 3;
                console.log("get_aibot");
                this.$http.post('/search_class', JSON.stringify({'question': this.question}))
                    .then(function(response) {
                        console.log(response);
                        // question
                        var item_right = this._generateItem(1, 'right', al, [this.temp_question]);
                        this.items.push(item_right);
                        // answer
                        var item_left = this._generateItem(0, 'left', al, [response.data.msg]);
                        this.items.push(item_left);
                    });
            }
            else {
                console.log("get_answer");
                this.$http.post('/search', JSON.stringify({'question':this.question}))
                    .then(function(response) {
                        console.log(response);
                        for (var al = 0; al < 3; al++) {
                            // var response = JSON.parse(res);
                            // question
                            var item_right = this._generateItem(1, 'right', al, [this.temp_question]);
                            this.items.push(item_right);
                            // answer
                            var hits = response.data[al].total;
                            if (hits == 0) {
                                var item_left = this._generateItem(0, 'left', al, ["抱歉这个问题我回答不了，请尝试别的问题，谢谢！"]);
                                this.items.push(item_left);
                            }
                            else {
                                for (var i = 0; i < hits; i++) {
                                    var response_message = response.data[al].hits[i],
                                        item_left = this._generateItem(0, 'left', al, []);
                                    if (al == 0) {
                                        item_left.message.push("题目：");
                                        item_left.message.push(response_message._source.question);
                                        item_left.message.push("答案: ");
                                    }
                                    if (al == 1) {
                                        item_left.message.push("主题：");
                                        item_left.message.push(response_message._source.question);
                                        item_left.message.push("展开讨论: ");
                                        item_left.fold = true;
                                    }
                                    if (al == 2) {
                                        item_left.message.push(response_message._source.question);
                                    }
                                    item_left.message.push(response_message._source.answer);
                                    this.items.push(item_left);
                                }
                                //msgend.scrollTop(div.scrollHeight);
                                //content.scrollTop(content[0].scrollHeight*5);
                            }
                        }
                        //console.log(this.items)
                    });
            }
            this.question = '';
        },
        getFolder: function(message, item) {
            if (message.$index == 2) {
                if (!item.fold) {
                    message.message = '展开讨论：';
                    item.fold = true;
                } else {
                    message.message = '收起讨论：';
                    item.fold = false;
                };
                //item.$$nextSibling
            }
        },
        folder: function(index, item) {
            if (index == 2) {
                if (item.fold)
                    return 'fa fa-plus-circle';
                else
                    return 'fa fa-minus-circle';
            }
            else
                return '';
        },
    },
    transitions: {
        expand: {
            beforeEnter: function (el) {
                el.textContent = 'beforeEnter'
            },
            enter: function (el) {
                el.textContent = 'enter'
            },
            afterEnter: function (el) {
                el.textContent = 'afterEnter'
            },
            beforeLeave: function (el) {
                el.textContent = 'beforeLeave'
            },
            leave: function (el) {
                el.textContent = 'leave'
            },
            afterLeave: function (el) {
                el.textContent = 'afterLeave'
            }
        }
    },
});

