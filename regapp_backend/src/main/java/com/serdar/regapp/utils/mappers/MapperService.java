package com.serdar.regapp.utils.mappers;

import org.modelmapper.ModelMapper;

public interface MapperService {

    ModelMapper forRequest();

    ModelMapper forResponse();
}
