package com.mycompany.myapp.dao;

import org.apache.ibatis.annotations.Param;

import com.mycompany.myapp.pojo.NewFriends;

public interface NewFriendsMapper {
    int insert(NewFriends record);

    int insertSelective(NewFriends record);
    
    Integer selectUnread(@Param("user_id") String user_id);
}