//
//  StripeEventHandler.h
//  eDance
//
//  Created by highjump on 2020/11/8.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface StripeEventHandler : RCTEventEmitter <RCTBridgeModule>

+ (id _Nonnull )shared;

@end

NS_ASSUME_NONNULL_END
