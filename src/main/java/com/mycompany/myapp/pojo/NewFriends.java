package com.mycompany.myapp.pojo;

public class NewFriends {
    private Integer id;

    private String userId;

    private String newfriendId;

    private Integer unread;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getNewfriendId() {
        return newfriendId;
    }

    public void setNewfriendId(String newfriendId) {
        this.newfriendId = newfriendId;
    }

    public Integer getUnread() {
        return unread;
    }

    public void setUnread(Integer unread) {
        this.unread = unread;
    }
}