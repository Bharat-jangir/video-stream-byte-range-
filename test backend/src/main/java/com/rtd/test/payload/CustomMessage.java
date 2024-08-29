package com.rtd.test.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
@AllArgsConstructor
public class CustomMessage {
    private String message;
    private boolean success=false;

}
